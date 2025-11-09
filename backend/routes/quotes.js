const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const createResult = require("../utils/result");
// Assuming you have a middleware to get userId from the request (e.g., from a JWT)
// const { authenticateToken } = require('../middleware/auth');

// --- Quotes Endpoints ---

// GET /quotes - Get All Quotes for a User, indicating if each is liked
// SQL: SELECT q.id, q.author, q.contents, q.userId, q.createdTime,
//      CASE WHEN f.userId IS NOT NULL THEN TRUE ELSE FALSE END AS isLiked
//      FROM quote q
//      LEFT JOIN favourite f ON q.id = f.quoteId AND f.userId = ?;
// Response: Array of quote objects with an 'isLiked' boolean field

// This endpoint should ideally be protected and receive the user's ID
router.get("/", (req, res, next) => {
  // *** IMPORTANT: Replace '1' with how you actually access the logged-in user's ID ***
  // For example, if using authentication middleware:
  // const currentUserId = req.userId;

  // Using a placeholder '1' for demonstration based on your SQL query example
  const currentUserId = 1;

  const sql = `
        SELECT 
            q.id, 
            q.author,
            q.contents,
            q.userId,
            q.createdTime, 
            CASE 
                WHEN f.userId IS NOT NULL THEN TRUE 
                ELSE FALSE 
            END AS isLiked 
        FROM 
            quote q 
        LEFT JOIN 
            favourite f ON q.id = f.quoteId AND f.userId = ?;
    `;

  db.query(sql, [currentUserId], (err, result) => {
    if (err) {
      console.error("Database error fetching quotes:", err);
      return next(err);
    }

    // Ensure boolean fields are treated as booleans in JS if needed
    const processedResults = result.map((quote) => ({
      ...quote,
      isLiked: Boolean(quote.isLiked), // Converts 0/1 from DB to false/true in JS
    }));

    res.send(createResult(null, processedResults));
  });
});

// Add other quote-related endpoints here (POST favorite, DELETE favorite, etc.)
// ...

module.exports = router;
