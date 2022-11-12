import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["home-container"]}>
      <button
        className={styles["signup-button"]}
        onClick={() => navigate("/signup")}
      >
        Sign up
      </button>
      <button
        className={styles["login-button"]}
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
};

export default Home;
