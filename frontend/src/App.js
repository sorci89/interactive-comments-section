import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Comments from "./pages/Comments";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={
            <Login setToken={setToken} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="/comments"
          element={<Comments token={token} currentUser={currentUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
