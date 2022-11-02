import axios from "axios";

const Reply = ({comment, currentUser, token, getComments, sendNewReply, setActiveElement, activeElement, setNewContent, newContent, addReplyDetails, isOpen, setIsOpen, deleteElement}) => {


    const sendReplyScore = async({reply}, score) => {
        try {
          const resp = await axios.put("http://localhost:4000/api/comments/editreplyscore", {
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
    
      const updateReply = async (replyId, replyingTo) => {
        let replyContent;

        if (newContent.search(`@${replyingTo},`) === 0) {
            replyContent = newContent.slice(replyingTo.length + 2)
        } else {
            replyContent = newContent
        }

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
              {reply.user._id === currentUser._id ? <><button onClick={()=> deleteElement(reply._id, "reply")}>Delete</button><button onClick={() => {setIsOpen("editor"); setActiveElement(reply._id); addReplyDetails(reply.replyingTo, reply.content)}} disabled={activeElement === reply._id} >Edit</button></> : <button onClick={()=> {setIsOpen("reply"); setActiveElement(reply._id); addReplyDetails(reply.user.username)}} disabled={activeElement === reply._id}>Reply</button>}
              <section><a href="nolink">@{reply.replyingTo}</a>{reply.content}</section>
              {activeElement === reply._id && <div>
                <img src={currentUser.profile_picture} alt="" />
                <input type="text" value={newContent} onChange={(event)=>setNewContent(event.target.value)}></input>
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