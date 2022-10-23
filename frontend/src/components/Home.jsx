import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({token}) => {

  const navigate = useNavigate()

  useEffect(() => {
    if (token) navigate("/comments")
  },)
  
  return (
    <div>
      <button onClick={()=> navigate("/signup")}>Sign up</button>
      <button onClick={()=> navigate("/login")}>Login</button>
    </div>
  )
}

export default Home