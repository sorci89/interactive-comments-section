import React from 'react'
import { useState } from "react";
import axios from "axios";
import styles from "./score.module.css";

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
    <div className={styles['score-container']}>
        <button className={styles['score-btn-plus']} onClick={()=> {sendScore(element, +1); setScored("plus"); setActiveElementBtn(element._id)}} disabled={currentUser._id === element.user._id || (activeElementBtn === element._id && scored === "plus")}>+</button>
        <div className={styles['score-number-container']}><p className={styles['score-number']}>{element.score}</p></div>
        <button className={styles['score-btn-minus']} onClick={()=> {sendScore(element, -1); setScored("minus"); setActiveElementBtn(element._id)}} disabled={currentUser._id === element.user._id || (activeElementBtn === element._id && scored === "minus")}>-</button>
    </div>
  )
}

export default Score