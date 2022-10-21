const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    password: { type: String },
    image: {
      png: { type: String },
      webp: { type: String },
    },
  },
  { timestamps: true }
);

let User = mongoose.model("User", userSchema);

module.exports = User;
