import React from "react";
import {  useSelector } from "react-redux";
import {  Redirect } from "react-router-dom";

import NavDrawer from "../NavDrawer/NavDrawer";

import "./HomePageCSS/HomePage.css";

/**
 * All pages are gated behind a user having a profile.
 * If profile doesn't exist, they get the boot!
 */

function HomePage() {
  const profileData = useSelector((store) => store.profileData);
  return (
    <>
      {!profileData.length ? (
        <Redirect to="/createProfile" />
      ) : (
        <div className="home-page-wrapper">
          <NavDrawer props={true} />
          <div className="home-page-container">
            <div className="home-page-welcome-container">
              <h3>Welcome Home</h3>
              <p className="home-page-nickname">
                {profileData[0]?.users_nickname}
              </p>
            </div>
            <br></br>
            <div>
              <h3 className="home-page-nickname">User Account Balance</h3>
              <p className="user-account-balance-home-page">
                {Number(profileData[0]?.account_balance).toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
