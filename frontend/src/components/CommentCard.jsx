import styles from "./commentCard.module.css";
import Score from "./Score";
import CreatedAt from "./CreatedAt";
import { TiArrowBack } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const CommentCard = ({
  comment,
  currentUser,
  getComments,
  deleteElement,
  setIsOpen,
  setActiveElement,
  setNewContent,
  addReplyDetails,
  activeElement,
  isOpen,
  updateComment,
  newContent,
  sendNewReply,
}) => {
  return (
    <>
      <div className={styles["comment-card"]}>
        <Score
          element={comment}
          currentUser={currentUser}
          getComments={getComments}
          type={"comment"}
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
        {comment.user._id === currentUser._id ? (
          <div className={styles["open-editor-buttongroup"]}>
            <button onClick={() => deleteElement(comment._id, "comment")}>
              <MdDelete /> Delete
            </button>
            <button
              onClick={() => {
                setIsOpen("editor");
                setActiveElement(comment._id);
                setNewContent(comment.content);
              }}
            >
              <MdModeEdit /> Edit
            </button>
          </div>
        ) : (
          <div className={styles["open-editor-button"]}>
            <button
              onClick={() => {
                setIsOpen("reply");
                setActiveElement(comment._id);
                addReplyDetails(comment.user.username);
              }}
              disabled={activeElement === comment._id}
            >
              <TiArrowBack /> Reply
            </button>
          </div>
        )}
        {activeElement === comment._id && isOpen === "editor" ? (
          <>
            <div className={styles["card-content-section"]}>
              <textarea
                className={styles["editor-text"]}
                value={newContent}
                onChange={(event) => setNewContent(event.target.value)}
              />
            </div>
            <button
              className={styles["update-editor-button"]}
              onClick={() => updateComment(comment._id)}
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
      {activeElement === comment._id && isOpen === "reply" && (
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
            value={newContent}
            onChange={(event) => setNewContent(event.target.value)}
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
