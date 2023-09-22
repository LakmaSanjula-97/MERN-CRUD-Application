import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import "./login.css";
import imageone from "../../Assests/imge_login.jpg";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setError(null);
      //res.data && window.location.replace("/register");
      console.log(user);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError("Username or password is incorrect");
    }
  };

  return (
    <div className="login">
      <div>
        <img className="loginImage" src={imageone} alt="" />
      </div>
      <form className="loginForm" onSubmit={handleSubmit}>
        <p className="loginTitle">LOGIN</p>
        {/* <label>Username :</label> */}
        <input
          type="text"
          className="loginInput"
          placeholder="Username"
          ref={userRef}
          autoComplete="username"
        />
        {/* <label>Password :</label> */}
        <input
          type="password"
          className="loginInput"
          placeholder="Password"
          ref={passwordRef}
          autoComplete="current-password"
        />
        {error && <div className="errorMessage">{error}</div>}{" "}
        {/* Show error message if error is not null */}
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
        <span className="registerLink">.</span>
      </form>
    </div>
  );
}
