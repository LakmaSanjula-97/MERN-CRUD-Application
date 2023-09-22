import React from "react";
import "./topBar.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-twitter"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
        <i className="topIcon fa-brands fa-square-pinterest"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/about" className="link">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            {user && user.role === "admin" ? (
              <Link to="/write" className="link">
                EVENT
              </Link>
            ) : null}
          </li>
          {/* <li className="topListItem">
            {user && user.role === "admin" ? (
              <Link to="/register" className="link">
                REGISTER
              </Link>
            ) : null}
          </li> */}
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img
              title="Edit My Profile"
              className="topImg"
              src={PF + user.profilePic}
              alt=""
            />
          </Link>
        ) : (
          <>
            <ul className="topList">
              <li className="topListItem">
                <Link to="/login" className="link">
                  LOGIN
                </Link>
              </li>
              {/* <li className="topListItem">
                <Link to="/register" className="link">
                  REGISTER
                </Link>
              </li> */}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
