import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

import NavDrawer from "../NavDrawer/NavDrawer";

import "./HomePageCSS/HomePage.css";

// Material-ui Imports
import Button from "@material-ui/core/Button";

// SweetAlert2
import Swal from "sweetalert2";

function HomePage() {
  const profileData = useSelector((store) => store.profileData);
  return (
    <>
      {!profileData.length ? (
        <Redirect to="/createProfile" />
      ) : (
        <div className="home-page-container">
        <NavDrawer props={true}/>
          <div className="home-page-welcome-container">
            <h3>Welcome</h3>
            <p className="home-page-nickname">
              {profileData[0]?.users_nickname}
            </p>
          </div>
          <br></br>
          <div>
            <h3 className="home-page-nickname">User Balance</h3>
            <p className="user-account-balance-home-page">
              {Number(profileData[0]?.account_balance).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
