import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./AboutPage.css";
import ListItem from "@material-ui/core/ListItem";
import NavDrawer from "../NavDrawer/NavDrawer";

function AboutPage() {
  const profileData = useSelector((store) => store.profileData);
  return (
    <>
      {!profileData.length ? (
        <Redirect to="/createProfile" />
      ) : (
        <div className="overall-wrapper-about-page">
          <NavDrawer props={true} />
          <div className="about-page-container">
            <h2>List of techs used</h2>
            <div className="tech-used-container">
              <ListItem>
                <a href="https://www.javascript.com/">JavaScript</a>
              </ListItem>
              <ListItem>
                <a href="https://reactjs.org/">Reactjs</a>
              </ListItem>
              <ListItem>
                <a href="https://react-redux.js.org/">React Redux</a>
              </ListItem>
              <ListItem>
                <a href="https://redux-saga.js.org/">Redux-Saga</a>
              </ListItem>
              <ListItem>
                <a href="https://www.postgresql.org/">PostgreSQL</a>
              </ListItem>
              <ListItem>
                <a href="https://www.coingecko.com/en">CoinGecko API</a>
              </ListItem>
              <ListItem>And the list goes on...</ListItem>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AboutPage;
