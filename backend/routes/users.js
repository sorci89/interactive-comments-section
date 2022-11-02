const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json("Missing credentials");
  }

  const userNameExists = await User.findOne({ username: req.body.username });
  if (userNameExists) return res.status(409).json("Username already in use");

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const userData = {
    username: req.body.username,
    password: hashedPassword,
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
  };
  new User(userData).save();

  res.status(200).json("Signed up succesfully");
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.loginUsername,
  });
  if (!user) return res.status(401).json("User Not found.");

  const passwordIsValid = await bcrypt.compare(
    req.body.loginPassword,
    user.password
  );
  if (!passwordIsValid) return res.status(401).json("User Not found.");

  const token = jwt.sign(
    { _id: user._id, png: user.image.png },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json(token);
});

module.exports = router;
