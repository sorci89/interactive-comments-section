import { useState} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";


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
      <div>
       <h1>Sign up</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>

        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button
          onClick={() => signup()}>
          Signup
        </button>
      </div>
    )
  }
  
  export default Signup