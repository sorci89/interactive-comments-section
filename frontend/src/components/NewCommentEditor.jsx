import React from "react";
import { createRef } from "react";
import styles from "./newCommentEditor.module.css";
import Editor from "./TextEditor/TextEditor";
import Button from "./Button/Button";

const NewCommentEditor = ({ currentUser, sendNewComment }) => {
  const editorRef = createRef();

  const handleNewComment = () => {
    const content = editorRef.current.value;
    sendNewComment(content);
  };

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
        <Editor
          className={styles["editor-text"]}
          ref={editorRef}
          placeholder="Add a comment..."
        />
        <Button onClick={handleNewComment} className={styles["editor-button"]}>
          Send
        </Button>
      </div>
    </>
  );
};

export default NewCommentEditor;
