import React from "react";
import styles from "./newCommentEditor.module.css";

const NewCommentEditor = ({
  currentUser,
  newComment,
  setNewComment,
  sendNewComment,
}) => {
  return (
    <>
      <div className={styles["new-comment-container"]}>
        <div className={styles["editor-profile-picture-container"]}>
          <img
            className={styles["editor-profile-picture"]}
            src={currentUser.png}
            alt=""
          />
        </div>
        <textarea
          className={styles["editor-text"]}
          placeholder="Add a comment..."
          onChange={(event) => setNewComment(event.target.value)}
          value={newComment}
        />
        <button
          className={styles["editor-button"]}
          onClick={() => sendNewComment()}
        >
          Send
        </button>
      </div>
    </>
  );
};

export default NewCommentEditor;
