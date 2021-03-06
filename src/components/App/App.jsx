import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { useDispatch } from "react-redux";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import CoinDetailsPage from "../CoinDetailsPage/CoinDetailsPage";
import CreateProfilePage from "../CreateProfilePage/CreateProfilePage";
import HomePage from "../HomePage/HomePage";
import CoinMarket from "../CoinMarket/CoinMarket";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import MyStashPage from "../MyStashPage/MyStashPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import RegisterPage from "../RegisterPage/RegisterPage";
import UserPage from "../UserPage/UserPage";
import userSaga from "../../redux/sagas/user.saga";


import "./App.css";

function App() {
  console.log(userSaga);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/login" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}

          <ProtectedRoute exact path="/myStash">
            <MyStashPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows CreateProfilePage else shows LoginPage
            exact
            path="/createProfile"
          >
            <CreateProfilePage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/coinDetails/:id">
            <CoinDetailsPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
            authRedirect="/homePage"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows CoinMarket else shows LoginPage
            exact
            path="/coinMarket"
          >
            <CoinMarket />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows HomePage else shows LoginPage
            exact
            path="/homePage"
          >
            <HomePage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/user"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/user"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            authRedirect="/user"
            // authRedirect="/createProfile/:id"
          >
            <LandingPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
