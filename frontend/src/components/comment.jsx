import styles from "../pages/comments.module.css";
import Reply from '../components/Reply'
import Score from "../components/Score";
import CreatedAt from "../components/CreatedAt";
import {TiArrowBack} from 'react-icons/ti'
import { MdDelete } from 'react-icons/md'
import { MdModeEdit } from 'react-icons/md'

const Comment = ({ comment, currentUser, getComments, token, deleteElement, setIsOpen, setActiveElement, setNewContent, addReplyDetails, activeElement }) => {
  return (
    <div className={styles['comment-card']}>
      <Score element={comment} currentUser={currentUser} token={token} getComments={getComments} type={"comment"}/>
      <div className={styles['comment-card-top-section']}>
        <div className={styles['picture-container']}>
          <img className={styles['profile-picture']} src={comment.user.image.png} alt="Profile" />
        </div>
        <a className={styles["profile-name-link"]} href="nolink">{comment.user.username}</a>
        {comment.user._id === currentUser._id && <span className={styles["currentuser-sign"]}>you</span>}
        <CreatedAt creationDate={comment.createdAt} />
      </div>
      {comment.user._id === currentUser._id ? (
        <div className={styles["open-editor-buttongroup"]}>
          <button onClick={()=> deleteElement(comment._id, "comment")}>
            <MdDelete/> Delete
          </button>
          <button onClick={() => {setIsOpen("editor"); setActiveElement(comment._id); setNewContent(comment.content)}}>
            <MdModeEdit/> Edit
          </button>
        </div>): (
        <div className={styles["open-editor-button"]}>
          <button onClick={()=> {setIsOpen("reply"); setActiveElement(comment._id); addReplyDetails(comment.user.username)}} disabled={activeElement === comment._id}>
            <TiArrowBack/> Reply
          </button>
        </div>
        )}
    </div>
  )
}

export default Comment