const router = require("express").Router();
const auth = require("../middleware/auth");
const Comment = require("../models/comments");

router.get("/", auth({ block: true }), async (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
