import axios from "axios";
import Score from "./Score";
import CreatedAt from "./CreatedAt";
import styles from "./reply.module.css";
import {TiArrowBack} from 'react-icons/ti'
import { MdDelete } from 'react-icons/md'
import { MdModeEdit } from 'react-icons/md'

const Reply = ({comment, currentUser, token, getComments, sendNewReply, setActiveElement, activeElement, setNewContent, newContent, addReplyDetails, isOpen, setIsOpen, deleteElement, sendScore}) => {

    const updateReply = async (replyId, replyingTo) => {
        let replyContent = newContent.search(`@${replyingTo},`) === 0 ? newContent.slice(replyingTo.length + 2) : newContent

        try {
            const resp = await axios.put("http://localhost:4000/api/comments/editreplycontent", {
              replyId,
              content: replyContent,
            }, {
              headers: {
                'Authorization': token
              }
            });
            getComments();
            setActiveElement()
          } catch(error) {
            console.log(error);
            return error.resp
          } 
      }

return (
  <>
  <div className={styles['reply-cards-container']}>
    <ul>
      {comment.replies.map(reply => <div className={styles['card-wrapper']}>
        <div className={styles['reply-line']}>
        </div>
        <li key={reply._id}>
          <div className={styles['reply-card']}>
            <Score currentUser={currentUser} element={reply} token={token} getComments={getComments} type={"reply"}/>
            <div className={styles["reply-card-top-section"]}>
              <div className={styles['picture-container']}>
                <img className={styles['profile-picture']} src={reply.user.image.png} alt="Profile" />
              </div>
              <a className={styles["profile-name-link"]} href="nolink">{reply.user.username}</a>
              {reply.user._id === currentUser._id && <span className={styles["currentuser-sign"]}>you</span>}
              <CreatedAt creationDate={reply.createdAt}/>
            </div>
            {reply.user._id === currentUser._id ? <div className={styles["open-editor-buttongroup"]}><button onClick={()=> deleteElement(reply._id, "reply")}><MdDelete/> Delete</button><button onClick={() => {setIsOpen("editor"); setActiveElement(reply._id); addReplyDetails(reply.replyingTo, reply.content)}} disabled={activeElement === reply._id} ><MdModeEdit/> Edit</button></div> : <div className={styles["open-editor-button"]}><button onClick={()=> {setIsOpen("reply"); setActiveElement(reply._id); addReplyDetails(reply.user.username)}} disabled={activeElement === reply._id}><TiArrowBack/> Reply</button></div>}
            {activeElement === reply._id && isOpen === "editor" ? <div className={styles["card-content-section"]}><textarea className={styles["editor-text"]}  value={newContent} onChange={(event)=>setNewContent(event.target.value)} /></div> : <div className={styles["card-content-section"]}><section><a href="nolink">@{reply.replyingTo}</a>{reply.content}</section></div>}
            {activeElement === reply._id && isOpen === "editor" && <button className={styles['update-editor-button']} onClick={()=>updateReply(reply._id, reply.replyingTo)}>Update</button>}
          </div>
          {activeElement === reply._id && isOpen === "reply" && <div className={styles["reply-editor"]}>
            <div className={styles['editor-profile-picture-container']}>
              <img className={styles['editor-profile-picture']} src={currentUser.png} alt="" />
            </div> 
            <textarea className={styles["editor-text"]} value={newContent} onChange={(event)=>setNewContent(event.target.value)} />
            {isOpen === "reply" && <button className={styles['editor-button']} onClick={()=>sendNewReply(comment._id, reply.user.username)}>Reply</button>}
          </div>}
        </li>
    </div>
    )}
    </ul>
  </div>
  </>
  )
}

export default Reply