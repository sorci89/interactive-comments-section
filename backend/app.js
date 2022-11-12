const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/users");
const commentRoutes = require("./routes/comments");

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL,
  })
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
