const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: { type: String },
    score: { type: String },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    replies: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Reply" }],
  },
  { timestamps: true }
);

let Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
