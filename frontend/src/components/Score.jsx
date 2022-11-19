import React from "react";
import { useState } from "react";
import styles from "./score.module.css";

const Score = ({ comment, disabled, updateComment }) => {
  const [scored, setScored] = useState("");
  const [activeElementBtn, setActiveElementBtn] = useState("");

  const isActiveButton = activeElementBtn === comment._id;

  return (
    <div className={styles["score-container"]}>
      <button
        className={styles["score-btn-plus"]}
        onClick={() => {
          updateComment({ ...comment, newScore: +1 });
          setScored("plus");
          setActiveElementBtn(comment._id);
        }}
        disabled={disabled || (isActiveButton && scored === "plus")}
      >
        +
      </button>
      <div className={styles["score-number-container"]}>
        <p className={styles["score-number"]}>{comment.score}</p>
      </div>
      <button
        className={styles["score-btn-minus"]}
        onClick={() => {
          updateComment({ ...comment, newScore: -1 });
          setScored("minus");
          setActiveElementBtn(comment._id);
        }}
        disabled={disabled || (isActiveButton && scored === "minus")}
      >
        -
      </button>
    </div>
  );
};

export default Score;
