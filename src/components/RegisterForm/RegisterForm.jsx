import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./RegisterForm.css";

// Material-ui imports
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
    display: "relative",
    position: "fixed",
    width: "225px",
    margin: "100px -225px",
    backgroundColor: "#3f51b5",
    color: "white",
  },
  quickSignIn: {
    color: "white",
  },
}));

function RegisterForm() {
  // Custom CSS
  const classes = useStyles();
  // Bring in history
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <>
      {/* <form className="formPanel" onSubmit={registerUser}>
        <h2>Register User</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              value={username}
              required
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
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Register" />
        </div>
      </form> */}

      <div className="area">
        <ul className="circles">
          <Grid className={classes.root}>
            <Paper elevation={10} className={classes.paperStyle}>
              <Grid align="center">
                <Avatar className={classes.avatarStyling}></Avatar>
                <h4>Register</h4>
              </Grid>
              {errors.registrationMessage && (
                <h3 className="alert" role="alert">
                  {errors.registrationMessage}
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
                placeholder="Enter Password"
                required
                value={password}
                variant="outlined"
              />
              <Button
                className={classes.signInButton}
                fullWidth
                onClick={registerUser}
                value="Register"
              >
                Sign Me Up
              </Button>
              <Button
                className={classes.signUpButton}
                fullWidth
                onClick={() => {
                  history.push("/login");
                }}
              >
                Back to login
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

export default RegisterForm;
