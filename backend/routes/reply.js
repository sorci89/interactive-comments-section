const router = require("express").Router();
const auth = require("../middleware/auth");
const Comment = require("../models/comments");
const User = require("../models/user");
const Reply = require("../models/reply");

//ADD NEW REPLY TO REPLY
router.post("/addreply", auth({ block: true }), async (req, res) => {
  const user = res.locals.user;
  if (!user) return res.sendStatus(401);

  const newReply = await Reply.create({
    content: req.body.content,
    score: req.body.score,
    comment: req.body.commentId,
    user: user._id,
  });

  await Reply.findOneAndUpdate(
    { _id: req.body.replyId },
    {
      $push: {
        replies: newReply._id,
      },
    }
  );

  return res.status(200).json("Reply has been added");
});

module.exports = router;
