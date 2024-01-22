const Post = require("../models/postModel");
const mongoose = require("mongoose");

// get all posts
const getPosts = async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });

  res.status(200).json(posts);
};

// get a single post
const getPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No post found" });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ error: "No post found" });
  }

  res.status(200).json(post);
};

// create a post
const createPost = async (req, res) => {
  const { title, body } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!body) {
    emptyFields.push("body");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add doc to DB
  try {
    const post = await Post.create({ title, body });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No post found" });
  }

  const post = await Post.findOneAndDelete({ _id: id });

  if (!post) {
    return res.status(404).json({ error: "No post found" });
  }

  res.status(200).json(post);
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  deletePost,
};
