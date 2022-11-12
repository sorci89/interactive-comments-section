import axios from "axios";
import { httpApi } from "../api/httpApi";
import { useState, useEffect } from "react";
import styles from "./comments.module.css";
import CommentCard from "../components/CommentCard";
import NewCommentEditor from "../components/NewCommentEditor";

const Comments = ({ token, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [activeElement, setActiveElement] = useState();
  const [isOpen, setIsOpen] = useState("");

  const { get } = httpApi();

  const getComments = async () => {
    try {
      const resp = await get("/comments");
      setComments(resp.data);
    } catch (error) {
      console.log(error);
      return error.resp;
    }
  };

  const addReplyDetails = (replyingTo, replyContent) => {
    let replyDetails = replyContent
      ? `@${replyingTo},${replyContent}`
      : `@${replyingTo},`;

    setNewContent(replyDetails);
  };

  const sendNewComment = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:4000/api/comments/addcomment",
        {
          content: newComment,
          score: "0",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(resp);
      setNewComment("");
      getComments();
    } catch (error) {
      console.log(error);
      return error.resp;
    }
  };

  const sendNewReply = async (commentId, replyingTo) => {
    let replyContent =
      newContent.search(`@${replyingTo},`) === 0
        ? newContent.slice(replyingTo.length + 2)
        : newContent;

    try {
      const resp = await axios.post(
        "http://localhost:4000/api/comments/addreply",
        {
          content: replyContent,
          score: "0",
          commentId,
          replyingTo,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(resp);
      setNewContent("");
      setIsOpen("");
      setActiveElement("");
      getComments();
    } catch (error) {
      console.log(error);
      return error.resp;
    }
  };

  const deleteElement = async (id, type) => {
    try {
      const resp = await axios.put(
        `http://localhost:4000/api/comments/delete${type}`,
        {
          id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(resp);
      getComments();
    } catch (error) {
      console.log(error);
      return error.resp;
    }
  };

  const updateComment = async (commentId) => {
    try {
      const resp = await axios.put(
        "http://localhost:4000/api/comments/editcommentcontent",
        {
          commentId,
          content: newContent,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(resp);
      setActiveElement();
      getComments();
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
                  setNewContent={setNewContent}
                  addReplyDetails={addReplyDetails}
                  activeElement={activeElement}
                  updateComment={updateComment}
                  newContent={newContent}
                  sendNewReply={sendNewReply}
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
