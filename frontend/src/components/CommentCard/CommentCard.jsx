import React from "react";
import { createRef } from "react";
import styles from "./commentCard.module.css";
import Score from "../Score/Score";
import CreatedAt from "../CreatedAt/CreatedAt";
import TextEditor from "../TextEditor/TextEditor";
import Button from "../Button/Button";
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
  const isActiveUser = comment.user._id === currentUser._id;
  const isActiveCard = activeElement === comment._id;

  const editorRef = createRef();

  const handleDeleteAction = () => {
    deleteElement(comment._id);
  };
  const handleUpdateAction = () => {
    const content = editorRef.current.value;
    updateComment({ ...comment, content });
  };
  const handleReplyAction = () => {
    console.log("reply");
  };
  const handleEditorOpening = () => {
    setIsOpen();
    setActiveElement(comment._id);
  };

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
            <Button onClick={handleDeleteAction}>
              <MdDelete /> Delete
            </Button>
            <Button onClick={handleEditorOpening}>
              <MdModeEdit /> Edit
            </Button>
          </div>
        ) : (
          <div className={styles["open-editor-button"]}>
            <Button onClick={handleEditorOpening} disabled={isActiveCard}>
              <TiArrowBack /> Reply
            </Button>
          </div>
        )}
        {isActiveCard && isActiveUser ? (
          <>
            <div className={styles["card-content-section"]}>
              <TextEditor
                ref={editorRef}
                defaultValue={comment.content}
                className={styles["editor-text"]}
              />
            </div>
            <Button
              onClick={handleUpdateAction}
              className={styles["update-editor-button"]}
            >
              Update
            </Button>
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
          <TextEditor ref={editorRef} className={styles["editor-text"]} />
          <Button
            onClick={handleReplyAction}
            className={styles["editor-button"]}
          >
            Reply
          </Button>
        </div>
      )}
    </>
  );
};

export default CommentCard;
