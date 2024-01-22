const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentsSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentsSchema);
