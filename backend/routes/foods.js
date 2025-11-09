const express = require('express')
const router = express.Router()
const db = require('../utils/db')
const createResult = require('../utils/result')
const multer = require('multer')
const upload = multer({ dest: 'images/' })
const fs = require('fs')

// foods endpoints

// 1: GET /foods - Get All Food Items
// SQL: SELECT * FROM fooditems
// Response: Array of food items
router.get('/', (req, res, next) => {
    const sql = "SELECT * FROM fooditems"
    db.query(sql, (err, result) => {
        if(err)
            return next(err)
        res.send(createResult(null, result))
    })
})

// 2: GET /foods/:id - Get Food Item by ID
// Params: id
// SQL: SELECT * FROM fooditems WHERE fid = ?
// Response: Food item object
router.get('/:id', (req, res, next) => {
    const sql = "SELECT * FROM fooditems WHERE fid = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if(err)
            return next(err)
        let food = null
        let error = err
        if(result.length > 0)
            food = result[0]
        else
            error = 'Food not found'
        res.send(createResult(error, food))
    })
})

// 3: POST /foods - Add New Food Item
// Request Body: { name, price, description, type, image file }
// SQL: INSERT INTO fooditems (name, price, description, image, type) VALUES (?, ?, ?, ?, ?)
// Image file to be uploaded using multer
// Response: Food item object or error
router.post('/', upload.single('image'), (req, res, next) => {
    console.log("file upload -- ", req)
    fs.rename(req.file.path, `images/${req.file.originalname}`, (err) => {
        if(err)
            return next(err)
    })
    const sql = "INSERT INTO fooditems (name, price, description, image, type) VALUES (?, ?, ?, ?, ?)"
    db.query(sql, [req.body.name, req.body.price, req.body.description, req.file.originalname, req.body.type], (err, result) => {
        if(err)
            return next(err)
        const item = { fid: result.insertId, name: req.body.name, price: req.body.price, description: req.body.description, image: req.file.originalname, type: req.body.type }
        res.send(createResult(null, item))
    })
})

// 4: PUT /foods/:id - Update Food Item
// Request Body: { name, price, description, type, image file  }
// Image file to be uploaded using multer
// SQL: UPDATE fooditems SET name = ?, price = ?, description = ?, type = ?, image = ? WHERE fid = ?
// Response: Success message
router.put('/:id', upload.single('image'), (req, res, next) => {
    fs.rename(req.file.path, `images/${req.file.originalname}`, (err) => {
        if(err)
            return next(err)
    })
    const sql = "UPDATE fooditems SET name = ?, price = ?, description = ?, type = ?, image = ? WHERE fid = ?"
    db.query(sql, [req.body.name, req.body.price, req.body.description, req.body.type, req.file.originalname, req.params.id], (err, result) => {
        if(err)
            return next(err)
        if(result.affectedRows == 0)
            return res.send(createResult('Food not found', null))
        res.send(createResult(null, 'Food updated'))
    })
})

// 5: DELETE /foods/:id - Delete Food Item
// Params: id
// SQL: DELETE FROM fooditems WHERE fid = ?
// Response: Success message
router.delete('/:id', (req, res, next) => {
    const sql = "DELETE FROM fooditems WHERE fid = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if(err)
            return next(err)
        if(result.affectedRows == 0)
            return res.send(createResult('Food not found', null))
        res.send(createResult(null, 'Food deleted'))
    })
})

// 6: PATCH /foods/:id/price - Update Food Price
// Request Body: { price }
// SQL: UPDATE fooditems SET price = ? WHERE fid = ?
// Response: Success message
router.patch('/:id/price', (req, res, next) => {
    const sql = "UPDATE fooditems SET price = ? WHERE fid = ?"
    db.query(sql, [req.body.price, req.params.id], (err, result) => {
        if(err)
            return next(err)
        if(result.affectedRows == 0)
            return res.send(createResult('Food not found', null))
        res.send(createResult(null, 'Price updated'))
    })
})

// 7: DELETE /foods/images/:imagename - Delete Food Image
// Params: imagename
// If image exists on fs, delete it
// Response: Success or Error message
router.delete('/images/:imagename', (req, res, next) => {
    fs.unlink(`images/${req.params.imagename}`, (err) => {
        if(err)
            return next(err)
        res.send(createResult(null, 'Image deleted'))
    })
})

module.exports = router
