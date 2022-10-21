const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    content: { type: String },
    score: { type: String },
    replyingTo: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

let Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
