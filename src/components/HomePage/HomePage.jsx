import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

import "./HomePageCSS/HomePage.css";

// Material-ui Imports
import Button from "@material-ui/core/Button";

// SweetAlert2
import Swal from "sweetalert2";

function HomePage() {
  const profileData = useSelector((store) => store.profileData);
  return (
    <>
      <div className="home-page-container">
        <div className="home-page-welcome-container">
          <h3>Welcome</h3>
          <p className="home-page-nickname">{profileData[0]?.users_nickname}</p>
        </div>
        <br></br>
        <div>
          <h3>Balance</h3>
          <p className="home-page-nickname">
            {Number(profileData[0]?.account_balance).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
