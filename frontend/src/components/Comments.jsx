import axios from "axios";
import jwt from "jwt-decode"
import { useState, useEffect } from "react";

const Comments = ({token}) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [newReply, setNewReply] = useState("")
  const [isReplyOpen, setIsReplyOpen] = useState(false)
  const [active, setActive] = useState()
  
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
  
  const sendNewComment = async() => {
    try {
      const resp = await axios.post("http://localhost:4000/api/comments/addcomment", {
        content: newComment,
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
      const resp = await axios.put("http://localhost:4000/api/comments/editcomment", {
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

  const sendNewReply = async(commentId) => {
    try {
      const resp = await axios.post("http://localhost:4000/api/comments/addreply", {
        content: newReply,
        score: "0",
        commentId
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
              <span>{comment.createdAt}</span>
              <button onClick={()=> {setIsReplyOpen(true); setActive(comment._id)}} disabled={active === comment._id && isReplyOpen}>Reply</button>
              {active === comment._id && isReplyOpen && <div>
                <img src={currentUser.profile_picture} alt="" />
                <input type="text" placeholder="Reply" onChange={(event)=>setNewReply(event.target.value)}/>
                <button onClick={()=>sendNewReply(comment._id)}>Reply</button></div>}
              <section>{comment.content}</section>
            </div>
          </div>
          <div>
            {comment.replies.map(reply => <div>{reply.content}</div>)}
          </div>
        </li>)}
        </ul>
      <div>
        <div>
          <img src={currentUser.profile_picture} alt="" />
          <input type="text" placeholder="Add a comment" onChange={(event)=>setNewComment(event.target.value)}/>
          <button onClick={()=>sendNewComment()}>Send</button>
        </div>
      </div>
    </div>
  )
}
  
  export default Comments