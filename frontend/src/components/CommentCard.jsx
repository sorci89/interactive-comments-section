import { useState } from "react";
import styles from "./commentCard.module.css";
import Score from "./Score";
import CreatedAt from "./CreatedAt";
import { TiArrowBack } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

export const Editor = ({ value, setContent }) => {
  return (
    <textarea
      className={styles["editor-text"]}
      type="text"
      value={value}
      onChange={(event) => setContent(event.target.value)}
    ></textarea>
  );
};

export const Button = ({ children, onClick, type, ...rest }) => {
  return (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

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

  const handleDeleteAction = () => {
    deleteElement(comment._id);
  };
  const handleUpdateAction = () => {
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
            {/* <button
              onClick={() => {
                setIsOpen();
                setActiveElement(comment._id);
                addReplyDetails(comment.user.username);
              }}
              disabled={isActiveCard}
            >
              <TiArrowBack /> Reply
            </button> */}
          </div>
        )}
        {isActiveCard && isActiveUser ? (
          <>
            <div className={styles["card-content-section"]}>
              <Editor setContent={setContent} value={content} />
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
          <Editor setContent={setContent} />
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
