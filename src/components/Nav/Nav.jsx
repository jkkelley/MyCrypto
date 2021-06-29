import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);
  const profileData = useSelector(store => store.profileData)
  const formSubmission = useSelector(store => store.formSubmission)
  console.log(formSubmission)
  let loginLinkData = {
    path: "/login",
    text: "Login / Register",
  };

  if (user.id != null) {
    loginLinkData.path = "/user";
    loginLinkData.text = "Home";
  }

  if (formSubmission.length === 0) {
    loginLinkData.path = "/createProfile";
    loginLinkData.text = "Create Profile";
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">MyCrypto</h2>
      </Link>
      <div>
      {user.id && formSubmission.length === 0 && (
        <LogOutButton className="navLink" />
      )}
        {user.id && profileData.length > 0 && (
          <>
            {/* <Link className="navLink" to="/info">
              Info Page
            </Link> */}
            <LogOutButton className="navLink" />
            <Link className="navLink" to={`/profile`}>
              Profile
            </Link>
          </>
        )}
        {/* <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link> */}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
