import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./comments.module.css";
import Reply from '../components/Reply'
import Score from "../components/Score";
import CreatedAt from "../components/CreatedAt";

const Comments = ({token, currentUser}) => {
  const [comments, setComments] = useState([])
  const [newContent, setNewContent] = useState("")
  const [activeElement, setActiveElement] = useState()
  const [isOpen, setIsOpen] = useState("")

  const getComments = async() => {
    try {
      const resp = await axios.get("http://localhost:4000/api/comments", {
        headers: {
          'Authorization': token
        }
      });
      setComments(resp.data)

    } catch(error) {
      console.log(error);
      return error.resp
    }
  }

  const addReplyDetails = (replyingTo, replyContent)=> {
    let replyDetails = replyContent ? `@${replyingTo},${replyContent}` : `@${replyingTo},`
    
    setNewContent(replyDetails)
 }
  
  const sendNewComment = async() => {
    try {
      const resp = await axios.post("http://localhost:4000/api/comments/addcomment", {
        content: newContent,
        score: '0',
      }, {
        headers: {
          'Authorization': token
        }
      });
      console.log(resp)
      getComments()
    } catch(error) {
      console.log(error);
      return error.resp
    }
  }

  const sendNewReply = async(commentId, replyingTo) => {
    let replyContent = newContent.search(`@${replyingTo},`) === 0 ? newContent.slice(replyingTo.length + 2) : newContent

    try {
      const resp = await axios.post("http://localhost:4000/api/comments/addreply", {
        content: replyContent,
        score: "0",
        commentId,
        replyingTo
      }, {
       headers: {
        'Authorization': token
        }
      });
      console.log(resp)
      getComments()
    } catch(error) {
      console.log(error);
      return error.resp
    } 
  }

  const deleteElement = async(id, type)=> {
    try {
      const resp = await axios.put(`http://localhost:4000/api/comments/delete${type}`, {
        id
      }, {
        headers: {
          'Authorization': token
        }
      })
      console.log(resp)
      getComments()
    } catch(error) {
      console.log(error);
      return error.resp
    } 
  }

  const updateComment = async(commentId)=> {
    try {
      const resp = await axios.put("http://localhost:4000/api/comments/editcommentcontent", {
        commentId,
        content: newContent
      }, {
        headers: {
          'Authorization': token
        }
      })
      console.log(resp)
      getComments()
    } catch(error) {
      console.log(error);
      return error.resp
    } 
  }

  useEffect(() => {
    getComments()
     // eslint-disable-next-line
  }, [])

  
  return (
    <>
    {token ? <div className={styles['comments-container']}>
     <ul>
        {comments.map(comment => <li key={comment._id}>
            <div className={styles['comment-card']}>
              <Score element={comment} currentUser={currentUser} token={token} getComments={getComments} type={"comment"}/>
              <div className={styles['comment-card-top-section']}>
                <div className={styles['picture-container']}>
                  <img className={styles['profile-picture']} src={comment.user.image.png} alt="Profile" />
                </div>
                <a className={styles["profile-name-link"]} href="nolink">{comment.user.username}</a>
                {comment.user._id === currentUser._id && <span>you</span>}
                <CreatedAt creationDate={comment.createdAt} />
              </div>
              {comment.user._id === currentUser._id ? <div className={styles["button-reply-editor"]}><button onClick={()=> deleteElement(comment._id, "comment")}>Delete</button><button onClick={() => {setIsOpen("editor"); setActiveElement(comment._id); setNewContent(comment.content)}}>Edit</button></div> : <div className={styles["button-reply-editor"]}><button onClick={()=> {setIsOpen("reply"); setActiveElement(comment._id); addReplyDetails(comment.user.username)}} disabled={activeElement === comment._id}>Reply</button></div>}
              <div className={styles["card-content-section"]}>
                <section>{comment.content}</section>
              </div>
          </div>
          {activeElement === comment._id && <div className={styles["reply-editor"]}>
            <img src={currentUser.profile_picture} alt="" />
            <input type="text" value={newContent} onChange={(event)=>setNewContent(event.target.value)}></input>
            {isOpen === "editor" && <button onClick={()=>updateComment(comment._id)}>Update</button>} 
            {isOpen === "reply" && <button onClick={()=>sendNewReply(comment._id, comment.user.username)}>Reply</button>}
          </div>}
          <Reply comment={comment} currentUser={currentUser} token={token} getComments={getComments} sendNewReply={sendNewReply} setIsOpen={setIsOpen} setActiveElement={setActiveElement} activeElement={activeElement} isOpen={isOpen} setNewContent={setNewContent} newContent={newContent} addReplyDetails={addReplyDetails} deleteElement={deleteElement} />
        </li>)}
      </ul>
      <div className={styles['new-comment-container']}>
        <img src={currentUser.png} alt="" />
        <input type="text" placeholder="Add a comment" onChange={(event)=>setNewContent(event.target.value)}/>
        <button onClick={()=>sendNewComment()}>Send</button>
      </div>
    </div> : <div>Please Signup or login</div>}
  </>
  )
}
  
  export default Comments