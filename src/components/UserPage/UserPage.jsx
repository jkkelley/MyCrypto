import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const profileData = useSelector((store) => store.profileData);
  console.log(`profileData from UserPage => `, profileData)
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      {!user.id ? null : <Redirect to='/createProfile' />}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
