import "./register.css";
import axios from "axios";
import { useState } from "react";
import validation from "validator";
import imageone from "../../Assests/imge_login.jpg";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username and email
    if (!validation.isEmail(email) || !validation.isAlphanumeric(username)) {
      setError("Invalid username or email format.");
      return;
    }
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError("Username or email already exists.");
    }
  };

  return (
    <div className="register">
      <div>
        <img className="registerImage" src={imageone} alt="" />
      </div>

      <form className="registerForm" onSubmit={handleSubmit}>
        <span className="registerTitle">REGISTER</span>
        {/* <label>Username</label> */}
        <input
          className="registerInput"
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* <label>Email</label> */}
        <input
          className="registerInput"
          type="text"
          placeholder="Email Address"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <label>Password</label> */}
        <input
          placeholder="Password"
          className="registerInput"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="errorMessage">{error}</div>
        <button className="registerButton" type="submit">
          Register
        </button>
        <span className="loginLink">.</span>
      </form>
    </div>
  );
}
