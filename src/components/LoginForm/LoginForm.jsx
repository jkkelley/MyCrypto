import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import "./LoginForm.css";

// Material-ui imports
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  paperStyle: {
    padding: 20,
    height: "50vh",
    width: 225,
    margin: "100px auto",
    paddingTop: theme.spacing(8),
  },
  avatarStyling: {
    backgroundColor: "#3f51b5",
  },
  textFieldBox: {
    margin: "5px auto",
    backgroundColor: "white",
  },
  signInButton: {
    margin: "5px auto",
    backgroundColor: "#3f51b5",
    color: "white",
  },
  signUpButton: {
    margin: "130px auto",
    backgroundColor: "#3f51b5",
    color: "white",
  },
  quickSignIn: {
    color: "white",
  },
}));

function LoginForm({ history }) {
  // Custom CSS
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const quickLogin = () => {
    console.log(`Clicked`);
    setUsername("SuperLu");
    setPassword("Qwerty123456789");
  };

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <>
      {/* <form className="formPanel" onSubmit={login}>
        <div className="quick-login-button-container">
          <button
            className="quick-login-button"
            onClick={quickLogin}
            width="30px"
          >
            Luke
          </button>
        </div>
        <h2>Login</h2>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Log In" />
        </div>
      </form> */}

      <div class="area">
        <ul class="circles">
          <Grid className={classes.root}>
            <Paper elevation={10} className={classes.paperStyle}>
              <Grid align="center">
                <Avatar className={classes.avatarStyling}></Avatar>
                <h4>Sign In</h4>
              </Grid>
              {errors.loginMessage && (
                <h3 className="alert" role="alert">
                  {errors.loginMessage}
                </h3>
              )}
              <TextField
                className={classes.textFieldBox}
                fullWidth
                label="Username"
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter Username"
                required
                value={username}
                variant="outlined"
              />
              <TextField
                className={classes.textFieldBox}
                fullWidth
                label="Password"
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeHolder="Enter Password"
                required
                value={password}
                variant="outlined"
              />
              <Button
                className={classes.signInButton}
                fullWidth
                onClick={login}
                value="Log In"
              >
                Sign In
              </Button>
              {/* This BUTTON needs to go if Deployed, DEMO only! ****** */}
              <Button
                className={classes.quickSignIn}
                fullWidth
                onClick={quickLogin}
              >
                Quick Sign in
              </Button>
              <Button
                className={classes.signUpButton}
                fullWidth
                onClick={() => {
                  history.push("/registration");
                }}
              >
                Not a User? Sign Up
              </Button>
            </Paper>
          </Grid>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}

export default LoginForm;
