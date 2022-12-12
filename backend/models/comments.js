const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    content: { type: String },
    score: { type: String },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    content: { type: String },
    score: { type: String },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    replies: [replySchema],
  },
  { timestamps: true }
);

let Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
