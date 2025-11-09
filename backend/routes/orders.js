const express = require('express')
const router = express.Router()
const db = require('../utils/db')
const createResult = require('../utils/result')

// orders endpoints

// 1: GET /orders - Get All Order Summaries
// Admin can get all orders. Users can only get their own orders.
// SQL: SELECT o.oid, o.uid, u.name, o.odate, o.deldate, o.total_amount, o.status 
// FROM orders o 
// INNER JOIN users u ON o.uid = u.uid
// Response: Array of order summaries
router.get('/', (req, res, next) => {
    const where = req.curuser.role === 'ROLE_ADMIN' ? '' : ' WHERE o.uid = ?'
    const sql = `SELECT o.oid, o.uid, u.name, o.odate, o.deldate, o.total_amount, o.status FROM orders o INNER JOIN users u ON o.uid = u.uid ${where} ORDER BY o.odate DESC`
    console.log(sql)
    db.query(sql, [req.curuser.uid], (err, result) => {
        if(err)
            return next(err)
        res.send(createResult(null, result))
    })
})

// 2: GET /orders/:id - Get Order Summary by ID
// Admin can get all orders. Users can only get their own orders.
// Params: id
// SQL: SELECT o.oid, o.uid, u.name, o.odate, o.deldate, o.total_amount, o.status 
// FROM orders o 
// INNER JOIN users u ON o.uid = u.uid 
// WHERE o.oid = ?
// Response: Order summary object
router.get('/:id', (req, res, next) => {
    const where = req.curuser.role === 'ROLE_ADMIN' ? '' : ' AND o.uid = ?'
    const sql = `SELECT o.oid, o.uid, u.name, o.odate, o.deldate, o.total_amount, o.status FROM orders o INNER JOIN users u ON o.uid = u.uid WHERE o.oid = ? ${where} ORDER BY o.odate DESC`
    db.query(sql, [req.params.id, req.curuser.uid], (err, result) => {
        if(err)
            return next(err)
        let order = null
        let error = err
        if(result.length > 0)
            order = result[0]
        else
            error = 'Order not found'
        res.send(createResult(error, order))
    })
})

// 3: GET /orders/bystatus/:status - Get Orders by Status
// Admin can get all orders. Users can only get their own orders.
// Params: status (PENDING, PROCESSING, CANCELLED, DELIVERED)
// SQL: SELECT o.oid, o.uid, u.name, o.odate, o.deldate, o.total_amount, o.status 
// FROM orders o 
// INNER JOIN users u ON o.uid = u.uid 
// WHERE o.status = ?
// Response: Array of orders
router.get('/bystatus/:status', (req, res, next) => {
    const where = req.curuser.role === 'ROLE_ADMIN' ? '' : ' AND o.uid = ?'
    const sql = `SELECT o.oid, o.uid, u.name, o.odate, o.deldate, o.total_amount, o.status FROM orders o INNER JOIN users u ON o.uid = u.uid WHERE o.status = ? ${where} ORDER BY o.odate DESC`
    db.query(sql, [req.params.status, req.curuser.uid], (err, result) => {
        if(err)
            return next(err)
        res.send(createResult(null, result))
    })
})

// 4: GET /orders/:id/details - Get Order Details
// Admin can get all orders. Users can only get their own orders.
// Params: id
// SQL: SELECT od.oid, od.fid, f.name, f.price, od.quantity, (f.price * od.quantity) as subtotal 
// FROM orderdetails od 
// INNER JOIN fooditems f ON od.fid = f.fid 
// WHERE od.oid = ?
// Response: Array of order items with details
router.get('/:id/details', (req, res, next) => {
    const where = req.curuser.role === 'ROLE_ADMIN' ? '' : ' AND o.uid = ?'
    const sql = `SELECT od.oid, od.fid, f.name, f.price, od.quantity, (f.price * od.quantity) as subtotal FROM orderdetails od INNER JOIN fooditems f ON od.fid = f.fid INNER JOIN orders o ON od.oid = o.oid WHERE od.oid = ? ${where}`
    db.query(sql, [req.params.id, req.curuser.uid], (err, result) => {
        if(err)
            return next(err)
        if(result.length == 0)
            return res.send(createResult('Order not found', null))
        res.send(createResult(null, result))
    })
})

// 5: POST /orders/place - Place New Order for current user
// Request Body: [{ foodId, quantity }, { foodId, quantity }, ...]
// Steps:
// Calculate total amount by fetching prices from fooditems
// Insert into orders table
// Get the generated oid
// Insert each item into orderdetails table
// Ideally -- Perform all DML operations in a single transaction (not implemeneted for simplicity)
// Response: Order ID and success message
router.post('/place', (req, res, next) => {
    // if req body is not an array of json objects with fields foodId and quantity, return validation error
    if(!Array.isArray(req.body) || !req.body.every(item => typeof item === 'object' && 'foodId' in item && 'quantity' in item))
        return res.send(createResult('Invalid request body', null))
    // calculate total_amount from fooditems in request body
    if(req.body.length == 0)
        return res.send(createResult('No items in order', null))
    const sql = "SELECT price FROM fooditems WHERE fid IN (?)"
    const values = req.body.map(item => item.foodId)
    db.query(sql, [values], (err, result) => {
        if(err)
            return next(err)
        if(result.length != req.body.length)
            return res.send(createResult('Some items not found', null))
        let total_amount = 0
        for(let i = 0; i < result.length; i++)
            total_amount += result[i].price * req.body[i].quantity
        // insert into orders table
        const sql = "INSERT INTO orders (uid, odate, total_amount, status) VALUES (?, ?, ?, ?)"
        const values = [req.curuser.uid, new Date(), total_amount, 'PENDING']
        db.query(sql, values, (err, result) => {
            if(err)
                return next(err)
            // if order is inserted successfully, insert into orderdetails table
            if(result.affectedRows == 0)
                return res.send(createResult('Order not placed', null))
            const oid = result.insertId
            const sql = "INSERT INTO orderdetails (oid, fid, quantity) VALUES ?"
            const values = req.body.map(item => [oid, item.foodId, item.quantity])
            db.query(sql, [values], (err, result) => {
                if(err)
                    return next(err)
                if(result.affectedRows != req.body.length)
                    return res.send(createResult('Order not placed correctly', null))
                res.send(createResult(null, { oid: oid, message: 'Order placed successfully' }))
            })
        })
    })
})

// 6: PATCH /orders/:id/status - Change Order Status
// Params: id
// Request Body: { status }
// SQL: UPDATE orders SET status = ? WHERE oid = ?
// If status is DELIVERED: Also update deldate to current timestamp
// Ideally -- Perform all DML operations in a single transaction (not implemeneted for simplicity)
// Response: Success message
router.patch('/:id/status', (req, res, next) => {
    const newStatus = req.body.status;
    // ADMIN can change status of all orders.
    // USER can cancel his own order.
    if((req.curuser.role === 'ROLE_USER' && newStatus === 'CANCELLED') || (req.curuser.role === 'ROLE_ADMIN')) {
        const sql = "SELECT * FROM orders WHERE oid = ?"
        db.query(sql, [req.params.id], (err, result) => {
            if(err)
                return next(err)
            if(result.length == 0)
                return res.send(createResult('Order not found', null))
            const order = result[0]
            if(order.status == 'DELIVERED')
                return res.send(createResult('Delivered Order cannot be Cancelled/Modified', null))
            if(newStatus == 'PROCESSING' && order.status != 'PENDING')
                return res.send(createResult('Only Pending Order can be Processed', null))
            if(newStatus == 'DELIVERED' && order.status != 'PROCESSING')
                return res.send(createResult('Only Processed Order can be Delivered', null))
            const sql = "UPDATE orders SET status = ?, deldate = ? WHERE oid = ?"
            const deldate = newStatus == 'DELIVERED' ? new Date() : null
            db.query(sql, [newStatus, deldate, req.params.id ], (err, result) => {
                if(err)
                    return next(err)
                if(result.affectedRows == 0)
                    return res.send(createResult('Order status not updated', null))
                res.send(createResult(null, { message: 'Order status updated successfully' }))
            })
        })
    }
    else
        return res.send(createResult('Unauthorized', null))
})

// You may add more endpoints as needed for business analysis (dashboard)

module.exports = router
