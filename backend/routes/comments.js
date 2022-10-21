const router = require("express").Router();
const auth = require("../middleware/auth");
const Comment = require("../models/comments");
const User = require("../models/user");
const Reply = require("../models/reply");

router.get("/", auth({ block: true }), async (req, res) => {
  res.sendStatus(200);
});

router.post("/addcomment", auth({ block: true }), async (req, res) => {
  const user = res.locals.user;
  if (!user) return res.sendStatus(401);

  // const newCommentData = req.body.newCommentData;

  const comment = await Comment.create({
    content: req.body.content,
    score: req.body.score,
    user: user._id,
  });
  res.status(200).json({ comment });
});

router.put("/editcomment", auth({ block: true }), async (req, res) => {
  await Comment.findByIdAndUpdate(
    { _id: req.body.commentId },
    {
      content: req.body.content,
      score: req.body.score,
    }
  );

  return res.status(200).json("Comment has been edited");
});

router.put("/deletecomment", auth({ block: true }), async (req, res) => {
  const id = req.params.id;

  await Comment.findByIdAndDelete(id);

  res.status(200).json("Comment has been deleted");
});

router.post("/addreply", auth({ block: true }), async (req, res) => {
  const user = res.locals.user;
  if (!user) return res.sendStatus(401);

  const newReply = await Reply.create({
    content: req.body.content,
    score: req.body.score,
    replyingTo: req.body.replyingToId,
    user: user._id,
  });

  await Comment.findOneAndUpdate(
    { _id: req.body.commentId },
    {
      $push: {
        replies: newReply._id,
      },
    }
  );

  return res.status(200).json("Reply has been added");
});
router.put("/editreply", auth({ block: true }), async (req, res) => {
  await Reply.findByIdAndUpdate(
    { _id: req.body.replyId },
    {
      content: req.body.content,
      score: req.body.score,
    }
  );

  return res.status(200).json("Reply has been edited");
});
router.put("/deletereply", auth({ block: true }), async (req, res) => {
  const id = req.params.id;

  await Reply.findByIdAndDelete(id);

  res.status(200).json("Reply has been deleted");
});

module.exports = router;
