import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Comments from "./components/Comments";

function App() {
  const token = sessionStorage.getItem("token");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/comments" element={<Comments token={token} />} />
      </Routes>
    </div>
  );
}

export default App;
