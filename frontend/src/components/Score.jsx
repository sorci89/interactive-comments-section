import React from 'react'
import { useState } from "react";
import axios from "axios";

const Score = ({element, currentUser, token, getComments, type}) => {
    const [scored, setScored] = useState("")
    const [activeElementBtn, setActiveElementBtn] = useState("")


    const sendScore = async(element, score) => {
        try {
          const resp = await axios.put(`http://localhost:4000/api/comments/edit${type}score`, {
            id: element._id,
            score: Number(element.score) + Number(score),
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

  return (
    <div>
        <button onClick={()=> {sendScore(element, +1); setScored("plus"); setActiveElementBtn(element._id)}} disabled={currentUser._id === element.user._id || (activeElementBtn === element._id && scored === "plus")}>+</button>
        <span>{element.score}</span>
        <button onClick={()=> {sendScore(element, -1); setScored("minus"); setActiveElementBtn(element._id)}} disabled={currentUser._id === element.user._id || (activeElementBtn === element._id && scored === "minus")}>-</button>
    </div>
  )
}

export default Score