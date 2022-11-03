import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate()

  
  return (
    <div>
      <button onClick={()=> navigate("/signup")}>Sign up</button>
      <button onClick={()=> navigate("/login")}>Login</button>
    </div>
  )
}

export default Home