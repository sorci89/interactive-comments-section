import { useState} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './signup.module.css'


const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const signup = async () => {
    try {
      const resp = await axios.post("http://localhost:4000/api/users/signup", {
        username, password});
        navigate("/login")
    } catch (error) {
      console.log(error);
    }

  };

    return (
      <div className={styles['signup-container']}>
        <input
        className={styles['username-input']}
          type="text"
          name="username"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>

        <input
        className={styles['username-input']}
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button
        className={styles['signup-button']}
          onClick={() => signup()}>
          Signup
        </button>
      </div>
    )
  }
  
  export default Signup