const Comment = require("../models/commentsModel");
const Post = require("../models/postModel");
const mongoose = require("mongoose");

// get all comments
const getComments = async (req, res) => {
  const comments = await Comment.find({}).sort({ createdAt: -1 });

  res.status(200).json(comments);
};

// create a comment
const createComment = async (req, res) => {
  const { body } = req.body;

  let emptyFields = [];

  if (!body) {
    emptyFields.push("body");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const comment = await Comment.create({ body });

    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "No post found" });
    }

    post.comments.push(comment._id);
    await post.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a comment
const deleteComment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No comment found" });
  }

  const comment = await Comment.findOneAndDelete({ _id: id });

  if (!comment) {
    return res.status(404).json({ error: "No comment found" });
  }

  res.status(200).json(comment);
};

module.exports = {
  createComment,
  getComments,
  deleteComment,
};
