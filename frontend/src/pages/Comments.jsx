import { httpApi } from "../api/httpApi";
import { useState, useEffect } from "react";
import styles from "./comments.module.css";
import CommentCard from "../components/CommentCard/CommentCard";
import NewCommentEditor from "../components/NewCommentEditor";

const Comments = ({ token, currentUser }) => {
  const [comments, setComments] = useState([]);

  const [activeElement, setActiveElement] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const { get, post, put, remove } = httpApi();

  const getComments = async () => {
    try {
      const resp = await get("/comments");
      setComments(resp);
    } catch (error) {
      console.log(error);
      return error.resp;
    }
  };

  // const addReplyDetails = (replyingTo, replyContent) => {
  //   let replyDetails = replyContent
  //     ? `@${replyingTo},${replyContent}`
  //     : `@${replyingTo},`;

  //   setNewContent(replyDetails);
  // };

  const sendNewComment = async (content, commentId) => {
    try {
      const resp = await post("/comments", {
        content: content,
        score: "0",
        commentId: commentId,
      });
      setComments([...comments, resp.comment]);
    } catch (error) {
      console.log(error);
      return error.resp;
    }
  };

  // const sendNewReply = async (commentId, replyingTo) => {
  //   let replyContent =
  //     newContent.search(`@${replyingTo},`) === 0
  //       ? newContent.slice(replyingTo.length + 2)
  //       : newContent;

  //   try {
  //     const resp = await axios.post(
  //       "http://localhost:4000/api/comments/addreply",
  //       {
  //         content: replyContent,
  //         score: "0",
  //         commentId,
  //         replyingTo,
  //       },
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );
  //     console.log(resp);
  //     setNewContent("");
  //     setIsOpen("");
  //     setActiveElement("");
  //     getComments();
  //   } catch (error) {
  //     console.log(error);
  //     return error.resp;
  //   }
  // };

  const deleteElement = async (id) => {
    console.log(id);
    try {
      const resp = await remove(`/comments/${id}`);
      console.log(resp);
      setComments(resp);
    } catch (error) {
      console.log(error);
      return error.resp;
    }
  };

  const updateComment = async (id, newComment, newReply) => {
    console.log(newReply._id);
    newComment && console.log(newComment);
    try {
      const resp = await put(`/comments/${id}`, {
        content: newComment && newComment.content,
        score:
          newComment &&
          (newComment.newScore
            ? Number(newComment.score) + Number(newComment.newScore)
            : newComment.score),
        replyContent: newReply.content,
        replyScore: "0",
      });
      console.log(resp);
      setActiveElement();
      setComments(
        comments.map((comment) => {
          if (comment._id === id) {
            return {
              ...comment,
              content: resp.comment.content,
              score: resp.comment.score,
              replies: resp.comment.replies,
            };
          }
          return comment;
        })
      );
    } catch (error) {
      console.log(error);
      return error.resp;
    }
  };

  useEffect(() => {
    getComments();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={styles["comments-container"]}>
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <CommentCard
                comment={comment}
                currentUser={currentUser}
                deleteElement={deleteElement}
                setIsOpen={setIsOpen}
                setActiveElement={setActiveElement}
                activeElement={activeElement}
                updateComment={updateComment}
                sendNewComment={sendNewComment}
              />
              {comment.replies.map((reply) => (
                <div key={reply._id}>
                  <CommentCard
                    comment={reply}
                    currentUser={currentUser}
                    deleteElement={deleteElement}
                    setIsOpen={setIsOpen}
                    setActiveElement={setActiveElement}
                    activeElement={activeElement}
                    updateComment={updateComment}
                    sendNewComment={sendNewComment}
                  />
                </div>
              ))}
            </li>
          ))}
        </ul>
        <NewCommentEditor
          currentUser={currentUser}
          sendNewComment={sendNewComment}
        />
      </div>
    </>
  );
};

export default Comments;
