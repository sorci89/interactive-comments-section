import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";

const Signup = () => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();

    // const data = new FormData(e.target);
    // console.log(data);
    // let username = data.get(username);
    // let password = data.get(password);
    try {
      let username = usernameRef.current.value;
      let password = passwordRef.current.value;
      await axios.post("http://localhost:4000/api/users/signup", {
        username,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles["signup-container"]} onSubmit={(e) => signup(e)}>
      <input
        className={styles["username-input"]}
        type="text"
        name="username"
        placeholder="Username"
        ref={usernameRef}
      />

      <input
        className={styles["username-input"]}
        type="password"
        placeholder="Password"
        ref={passwordRef}
      />
      <button className={styles["signup-button"]}>Signup</button>
    </form>
  );
};

export default Signup;
