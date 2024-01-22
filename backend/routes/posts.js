const express = require("express");
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
} = require("../controllers/postController");
const {
  createComment,
  getComments,
  deleteComment,
} = require("../controllers/commentsController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all posts
router.use(requireAuth);

// get all posts
router.get("/", getPosts);

// get a single post
router.get("/:id", getPost);

// post a new post
router.post("/", createPost);

// delete a post
router.delete("/:id", deletePost);

module.exports = router;
