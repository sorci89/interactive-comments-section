import axios from "axios";
import { httpApi } from "../api/httpApi";
import { useState, useEffect } from "react";
import styles from "./comments.module.css";
import CommentCard from "../components/CommentCard";
import NewCommentEditor from "../components/NewCommentEditor";

const Comments = ({ token, currentUser }) => {
  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState("");
  const [activeElement, setActiveElement] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const { get, post, put } = httpApi();

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

  const sendNewComment = async () => {
    try {
      const resp = await post("/comments", {
        content: newComment,
        score: "0",
      });
      console.log(resp);
      setNewComment("");
      getComments();
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

  const deleteElement = async (id, type) => {
    try {
      const resp = await put(`/comments/delete${type}`, {
        id,
      });
      console.log(resp);
      getComments();
    } catch (error) {
      console.log(error);
      return error.resp;
    }
  };

  const updateComment = async (newComment) => {
    try {
      const resp = await put(`/comments/${newComment._id}`, {
        content: newComment.content,
      });
      console.log(resp);
      setActiveElement();
      setComments(
        comments.map((comment) => {
          if (comment._id === newComment._id) {
            return {
              ...comment,
              content: resp.comment.content,
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

  const sendScore = async (element, score) => {
    try {
      const resp = await put(`/comments/${element._id}`, {
        score: Number(element.score) + Number(score),
      });
      console.log(resp);
      setComments(
        comments.map((comment) => {
          if (comment._id === element._id) {
            return {
              ...comment,
              score: resp.comment.score,
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
      {token ? (
        <div className={styles["comments-container"]}>
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                <CommentCard
                  comment={comment}
                  currentUser={currentUser}
                  getComments={getComments}
                  deleteElement={deleteElement}
                  setIsOpen={setIsOpen}
                  isOpen={isOpen}
                  setActiveElement={setActiveElement}
                  // addReplyDetails={addReplyDetails}
                  activeElement={activeElement}
                  updateComment={updateComment}
                  // sendNewReply={sendNewReply}
                  sendScore={sendScore}
                />
              </li>
            ))}
          </ul>
          <NewCommentEditor
            currentUser={currentUser}
            setNewComment={setNewComment}
            newComment={newComment}
            sendNewComment={sendNewComment}
          />
        </div>
      ) : (
        <div>Please Signup or login</div>
      )}
    </>
  );
};

export default Comments;
