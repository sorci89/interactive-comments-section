import axios from "axios";
import jwt from "jwt-decode"
import { useState, useEffect } from "react";
import Reply from './Reply'

const Comments = ({token}) => {
  const [comments, setComments] = useState([])
  const [newContent, setNewContent] = useState("")
  const [activeElement, setActiveElement] = useState()
  const [isOpen, setIsOpen] = useState("")
  
  const currentUser = jwt(token)
    
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

  const sendScore = async({comment}, score) => {
    try {
      const resp = await axios.put("http://localhost:4000/api/comments/editcommentscore", {
        commentId: comment._id,
        score: Number(comment.score) + Number(score),
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
    <div>
        <ul>
        {comments.map(comment => <li key={comment._id}>
          <div>
            <div>
              <button onClick={()=> sendScore({comment}, +1)} disabled={currentUser._id === comment.user._id}>+</button>
              <span>{comment.score}</span>
              <button onClick={()=> sendScore({comment}, -1)} disabled={currentUser._id === comment.user._id}>-</button>
            </div>
            <div>
              <div>
                <img src={comment.user.image.png} alt="Profile" />
              </div>
              <a href="nolink">{comment.user.username}</a>
              {comment.user._id === currentUser._id && <span>you</span>}
              <span>{comment.createdAt}</span>
              {comment.user._id === currentUser._id ? <><button onClick={()=> deleteElement(comment._id, "comment")}>Delete</button><button onClick={() => {setIsOpen("editor"); setActiveElement(comment._id); setNewContent(comment.content)}}>Edit</button></> : <button onClick={()=> {setIsOpen("reply"); setActiveElement(comment._id); addReplyDetails(comment.user.username)}} disabled={activeElement === comment._id}>Reply</button>}
              <section>{comment.content}</section>
              {activeElement === comment._id && <div>
                <img src={currentUser.profile_picture} alt="" />
                <input type="text" value={newContent} onChange={(event)=>setNewContent(event.target.value)}></input>
                {isOpen === "editor" && <button onClick={()=>updateComment(comment._id)}>Update</button>} 
                {isOpen === "reply" && <button onClick={()=>sendNewReply(comment._id, comment.user.username)}>Reply</button>}
                </div>}
            </div>
          </div>
          <Reply comment={comment} currentUser={currentUser} token={token} getComments={getComments} sendNewReply={sendNewReply} setIsOpen={setIsOpen} setActiveElement={setActiveElement} activeElement={activeElement} isOpen={isOpen} setNewContent={setNewContent} newContent={newContent} addReplyDetails={addReplyDetails} deleteElement={deleteElement}/>
        </li>)}
        </ul>
      <div>
        <div>
          <img src={currentUser.png} alt="" />
          <input type="text" placeholder="Add a comment" onChange={(event)=>setNewContent(event.target.value)}/>
          <button onClick={()=>sendNewComment()}>Send</button>
        </div>
      </div>
    </div>
  )
}
  
  export default Comments