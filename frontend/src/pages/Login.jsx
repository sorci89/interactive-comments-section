import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode"
import styles from './login.module.css'

const Login = ({setCurrentUser, setToken}) => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
   

    const navigate = useNavigate()

    const login = async () => {

        try {
          const resp = await axios.post("http://localhost:4000/api/users/login", {
            loginUsername,
            loginPassword,
          });
          setToken(resp.data)
          sessionStorage.setItem("token", resp.data);
          setCurrentUser(jwt(resp.data));
          navigate("/comments")
        } catch (error) {
          sessionStorage.removeItem("token")
          setToken(null)
        }
        }

    return (
      <div className={styles['login-container']}>
        <input
        className={styles['username-input']}
          type="text"
          placeholder="Username"
          onChange={(event) => setLoginUsername(event.target.value)}
        />
        <input
        className={styles['username-input']}
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(event) => setLoginPassword(event.target.value)}
        />
        <button className={styles['login-button']} onClick={() => login()} disabled={loginUsername.length === 0 || loginPassword.length === 0 }>Login</button>
      </div>
    )
  }
  
  export default Login