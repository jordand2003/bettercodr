const express = require("express");
const {
  createComment,
  getComments,
  deleteComment,
} = require("../controllers/commentsController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Require authentication for all comments
router.use(requireAuth);

// Get all comments
router.get(`/`, getComments);

// Post a new comment for a specific post
router.post(`/:postId`, createComment);

// Delete a comment
router.delete(`/:id`, deleteComment);

module.exports = router;
