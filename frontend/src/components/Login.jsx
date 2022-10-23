import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const navigate = useNavigate()

    const login = async () => {
        try {
          const resp = await axios.post("http://localhost:4000/api/users/login", {
            loginUsername,
            loginPassword,
          });
         
          sessionStorage.setItem("token", resp.data);
          navigate("/comments")

        } catch (error) {
          sessionStorage.removeItem("token")
          }
        }

    return (
      <div>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => setLoginUsername(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          value={loginPassword}
          onChange={(event) => setLoginPassword(event.target.value)}
        ></input>
        
          <button onClick={() => login()} disable={(loginUsername.length === 0) || (loginPassword.length === 0 )}>Login</button>
      </div>
    )
  }
  
  export default Login