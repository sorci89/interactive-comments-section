import React from "react";
import { useState } from "react";
import styles from "./score.module.css";

export const Button = ({ type, update, disabled, isActiveButton, scored, children }) => {
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      onClick={() => { update(type) }}
      disabled={disabled || (isActiveButton && scored === type)}
    >
      {children}
    </button>
  )
}

const Score = ({ comment, disabled, updateComment }) => {
  const [scored, setScored] = useState("");
  const [activeElementBtn, setActiveElementBtn] = useState("");


  const handleScoreUpdate = (type) => {
    let newScore = type === 'plus' ? '+1' : "-1";
    updateComment({ ...comment, newScore });
    setScored(type);
    setActiveElementBtn(comment._id);
  }
  

  const isActiveButton = activeElementBtn === comment._id;
  return (
    <div className={styles.container}>
      <Button
        type="plus" 
        update={handleScoreUpdate}
        scored={scored}
        disabled={disabled}
        isActiveButton={isActiveButton}
      >
        +
      </Button>
      <div className={styles.container}>
        <p className={styles.number}>{comment.score}</p>
      </div>
      <Button
        type="minus" 
        update={handleScoreUpdate}
        scored={scored}
        disabled={disabled}
        isActiveButton={isActiveButton}
      >
        -
      </Button>
    </div>
  );
};

export default Score;
