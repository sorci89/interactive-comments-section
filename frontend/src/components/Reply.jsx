import axios from "axios";
import { useState } from "react";

const Reply = ({comment, currentUser, token, getComments, sendNewReply, setActive, active, setNewReply, newReply, addReplyDetails, isOpen, setIsOpen}) => {

    const [isEditing, setIsEditing] = useState(false)

    const sendReplyScore = async({reply}, score) => {
        try {
          const resp = await axios.put("http://localhost:4000/api/comments/editreply", {
            replyId: reply._id,
            score: Number(reply.score) + Number(score),
          }, {
            headers: {
              'Authorization': token
            }
          });
          getComments()
        } catch(error) {
          console.log(error);
          return error.resp
        } 
      }

      const deleteReply = async(id)=> {
        try {
          const resp = await axios.put("http://localhost:4000/api/comments/deletereply", {
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
    
      const updateReply = async (replyId, replyingTo) => {
        let replyContent;

        if (newReply.search(`@${replyingTo},`) === 0) {
            replyContent = newReply.slice(replyingTo.length + 2)
        } else {
            replyContent = newReply
        }

        try {
            const resp = await axios.put("http://localhost:4000/api/comments/editreply", {
              replyId,
              content: replyContent,
            }, {
              headers: {
                'Authorization': token
              }
            });
            getComments();
            setIsEditing(false)
            setActive()
          } catch(error) {
            console.log(error);
            return error.resp
          } 
      }

return (
<>
<ul>
            {comment.replies.map(reply => <li key={reply._id}>
              <div>
              <button onClick={()=> sendReplyScore({reply}, +1)} disabled={currentUser._id === reply.user._id}>+</button>
              <span>{reply.score}</span>
              <button onClick={()=> sendReplyScore({reply}, -1)} disabled={currentUser._id === reply.user._id}>-</button>
            </div>
            <div>
              <div>
                <img src={reply.user.image.png} alt="Profile" />
              </div>
              <a href="nolink">{reply.user.username}</a>
              {reply.user._id === currentUser._id && <span>you</span>}
              <span>{reply.createdAt}</span>
              {reply.user._id === currentUser._id ? <><button onClick={()=> deleteReply(reply._id)}>Delete</button><button onClick={() => {setIsOpen("editor"); setActive(reply._id); addReplyDetails(reply.replyingTo, reply.content)}} disabled={active === reply._id} >Edit</button></> : <button onClick={()=> {setIsOpen("reply"); setActive(reply._id); addReplyDetails(reply.user.username)}} disabled={active === reply._id}>Reply</button>}
              <section><a href="nolink">@{reply.replyingTo}</a>{reply.content}</section>
              {active === reply._id && <div>
                <img src={currentUser.profile_picture} alt="" />
                <input type="text" value={newReply} onChange={(event)=>setNewReply(event.target.value)}></input>
                {isOpen === "editor" && <button onClick={()=>updateReply(reply._id, reply.replyingTo)}>Update</button>} 
                {isOpen === "reply" && <button onClick={()=>sendNewReply(comment._id, reply.user.username)}>Reply</button>}
                </div>}
            </div> 
            </li>)}
          </ul>
</>
)
}

export default Reply