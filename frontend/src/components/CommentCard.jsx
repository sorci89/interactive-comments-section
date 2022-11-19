import { useState } from "react";
import styles from "./commentCard.module.css";
import Score from "./Score";
import CreatedAt from "./CreatedAt";
import { TiArrowBack } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const CommentCard = ({
  comment,
  currentUser,
  deleteElement,
  setIsOpen,
  setActiveElement,
  addReplyDetails,
  activeElement,
  updateComment,
  sendNewReply,
}) => {
  const [content, setContent] = useState(comment.content);

  const isActiveUser = comment.user._id === currentUser._id;
  const isActiveCard = activeElement === comment._id;

  return (
    <>
      <div className={styles["comment-card"]}>
        <Score
          comment={comment}
          disabled={isActiveUser}
          updateComment={updateComment}
        />
        <div className={styles["comment-card-top-section"]}>
          <div className={styles["picture-container"]}>
            <img
              className={styles["profile-picture"]}
              src={comment.user.image.png}
              alt="Profile"
            />
          </div>
          <a className={styles["profile-name-link"]} href="nolink">
            {comment.user.username}
          </a>
          {comment.user._id === currentUser._id && (
            <span className={styles["currentuser-sign"]}>you</span>
          )}
          <CreatedAt creationDate={comment.createdAt} />
        </div>
        {isActiveUser ? (
          <div className={styles["open-editor-buttongroup"]}>
            <button onClick={() => deleteElement(comment._id, "comment")}>
              <MdDelete /> Delete
            </button>
            <button
              onClick={() => {
                setIsOpen();
                setActiveElement(comment._id);
              }}
            >
              <MdModeEdit /> Edit
            </button>
          </div>
        ) : (
          <div className={styles["open-editor-button"]}>
            <button
              onClick={() => {
                setIsOpen();
                setActiveElement(comment._id);
                addReplyDetails(comment.user.username);
              }}
              disabled={isActiveCard}
            >
              <TiArrowBack /> Reply
            </button>
          </div>
        )}
        {isActiveCard && isActiveUser ? (
          <>
            <div className={styles["card-content-section"]}>
              <textarea
                className={styles["editor-text"]}
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </div>
            <button
              className={styles["update-editor-button"]}
              onClick={() => updateComment({ ...comment, content })}
            >
              Update
            </button>
          </>
        ) : (
          <div className={styles["card-content-section"]}>
            <section>
              <a href="nolink"></a>
              {comment.content}
            </section>
          </div>
        )}
      </div>
      {isActiveCard && !isActiveUser && (
        <div className={styles["reply-editor"]}>
          <div className={styles["editor-profile-picture-container"]}>
            <img
              className={styles["editor-profile-picture"]}
              src={currentUser.png}
              alt=""
            />
          </div>
          <textarea
            className={styles["editor-text"]}
            type="text"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></textarea>
          <button
            className={styles["editor-button"]}
            onClick={() => sendNewReply(comment._id, comment.user.username)}
          >
            Reply
          </button>
        </div>
      )}
    </>
  );
};

export default CommentCard;
