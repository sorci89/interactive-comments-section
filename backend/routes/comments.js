const router = require("express").Router();
const auth = require("../middleware/auth");
const Comment = require("../models/comments");
const User = require("../models/user");
const Reply = require("../models/reply");

// GET comments
//  no payload | list of comment
// POST comments
//  comment as a payload | comment
// GET comments/{id}
//  no payload | specific comment
// PUT/PATCH comments/{id}
// comment data as payload | comment
// DELETE comments/{id}
// no payload | 200 ok status

router.get("/", auth({ block: true }), async (req, res) => {
  const comments = await Comment.find({})
    .populate("user")
    .populate({ path: "replies", populate: [{ path: "user" }] })
    .populate("user");

  res.status(200).json(comments);
});

router.post("/", auth({ block: true }), async (req, res) => {
  const user = res.locals.user;
  if (!user) return res.sendStatus(401);

  const comment = await Comment.create({
    content: req.body.content,
    score: req.body.score,
    user: user._id,
  });
  res.status(200).json({ comment });
});

router.delete("/:id", auth({ block: true }), async (req, res) => {
  const id = req.params.id;
  if (!id) return res.sendStatus(404);

  await Comment.findByIdAndDelete(id);

  res.status(200).json("Comment has been deleted");
});

router.put("/:id", auth({ block: true }), async (req, res) => {
  const user = res.locals.user;
  if (!user) return res.sendStatus(401);

  const comment = await Comment.findById({ _id: req.params.id });

  if (user._id === comment.user._id) return res.sendStatus(403);

  await comment.updateOne({
    score: req.body.score,
    content: req.body.content,
  });

  let newComment = await Comment.findById({ _id: req.params.id });
  return res.status(200).json({ comment: newComment });
});

//////// old

// ADD NEW COMMENT

router.post("/addcomment", auth({ block: true }), async (req, res) => {
  const user = res.locals.user;
  if (!user) return res.sendStatus(401);

  const comment = await Comment.create({
    content: req.body.content,
    score: req.body.score,
    user: user._id,
  });
  res.status(200).json({ comment });
});

// EDIT COMMENT SCORE
router.put("/editcommentscore", auth({ block: true }), async (req, res) => {
  const user = res.locals.user;

  const comment = await Comment.findById({ _id: req.body.id });

  if (user._id == comment.user._id) return res.sendStatus(403);

  await comment.updateOne({
    score: req.body.score,
  });
  return res.status(200).json("Comment score has been edited");
});

// EDIT COMMENT CONTENT
router.put("/editcommentcontent", auth({ block: true }), async (req, res) => {
  const user = res.locals.user;

  const comment = await Comment.findById({ _id: req.body.commentId });

  if (user._id != comment.user._id) return res.sendStatus(403);

  await comment.updateOne({
    content: req.body.content,
  });
  return res.status(200).json("Comment content has been edited");
});

//DELETE COMMENT

//ADD NEW REPLY
router.post("/addreply", auth({ block: true }), async (req, res) => {
  const user = res.locals.user;
  if (!user) return res.sendStatus(401);

  const newReply = await Reply.create({
    content: req.body.content,
    score: req.body.score,
    comment: req.body.commentId,
    user: user._id,
    replyingTo: req.body.replyingTo,
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

//EDIT REPLY SCORE
router.put("/editreplyscore", auth({ block: true }), async (req, res) => {
  const user = res.locals.user;

  const reply = await Reply.findById({ _id: req.body.id });

  console.log(reply);
  if (user._id == reply.user._id) return res.sendStatus(403);

  await reply.updateOne({
    score: req.body.score,
  });

  return res.status(200).json("Reply score has been edited");
});

//EDIT REPLY CONTENT
router.put("/editreplycontent", auth({ block: true }), async (req, res) => {
  await Reply.findByIdAndUpdate(
    { _id: req.body.replyId },
    {
      content: req.body.content,
    }
  );

  return res.status(200).json("Reply content has been edited");
});

// DELETE REPLY
router.put("/deletereply", auth({ block: true }), async (req, res) => {
  const id = req.body.id;
  if (!id) return res.sendStatus(404);

  await Reply.findByIdAndDelete(id);

  res.status(200).json("Reply has been deleted");
});

module.exports = router;
