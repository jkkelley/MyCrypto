import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

import "./CreateProfilePage.css";
import axios from "axios";

// Material-ui Imports
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function CreateProfilePage() {
  // Bring in useHistory
  const history = useHistory();
  // Bring in dispatch
  const dispatch = useDispatch();
  // Custom CSS
  const classes = useStyles();

  const formSubmission = useSelector((store) => store.formSubmission);
  const profileData = useSelector((store) => store.profileData);
  console.log(profileData);
  console.log(formSubmission);
  const params = useParams();
  console.log(params.id);
  // Function to handle creation of profile
  // Sweet Alert to ask for confirmation
  const handleCreateProfile = () => {
    console.log(`You've clicked handleCreateProfile`);

    // Ask them nicely if they want to create Profile.
    Swal.fire({
      title: "Create Profile",
      text: `${formSubmission.first}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      allowOutsideClick: true,
      allowEnterKey: true,
      backdrop: true,
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        console.log(formSubmission);
        dispatch({ type: "POST_CREATE_PROFILE", payload: formSubmission });

        history.push(`/profile/${Number(params.id)}`);
      }
    });
  };

  const handleFirstNameChange = (event) => {
    event.preventDefault();
    dispatch({
      type: "SET_FIRST_NAME_CREATE_PROFILE",
      payload: event.target.value,
    });
  };

  const handleLastNameChange = (event) => {
    event.preventDefault();
    dispatch({
      type: "SET_LAST_NAME_CREATE_PROFILE",
      payload: event.target.value,
    });
  };

  const handleNicknameChange = (event) => {
    event.preventDefault();
    dispatch({
      type: "SET_NICKNAME_CREATE_PROFILE",
      payload: event.target.value,
    });
  };

  const handleEmailChange = (event) => {
    event.preventDefault();
    dispatch({
      type: "SET_EMAIL_CREATE_PROFILE",
      payload: event.target.value,
    });
  };

  return (
    <>
      <div className="create-profile-container">
        <div className="create-form">
          <p>Create Profile Page</p>
          <form className="create-profile-page-form-container">
            <TextField
              required
              placeholder="First Name"
              onChange={handleFirstNameChange}
              value={formSubmission?.first}
            />
            <TextField
              placeholder="Last Name"
              onChange={handleLastNameChange}
              value={formSubmission?.last}
            />
            <TextField
              required
              placeholder="Nickname"
              onChange={handleNicknameChange}
              value={formSubmission?.nickname}
            />
            <TextField
              required
              placeholder="email"
              onChange={handleEmailChange}
              value={formSubmission?.email}
            />

            <Button variant="outlined" onClick={handleCreateProfile}>
              Add
            </Button>
          </form>
        </div>
        {/* if profile data doesn't come back empty, shoot the user to /profile */}
        {!profileData.length ? 0 : <Redirect to="/profile" />}
      </div>
    </>
  );
}

export default CreateProfilePage;
