import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

// Material-ui Imports
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

// SweetAlert2
import Swal from "sweetalert2";

// ProfilePageComponents
import { UsersFirstName } from "./ProfilePageComponents/user.first.name";


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

function ProfilePage() {
  // Bring in useHistory
  const history = useHistory();
  // Bring in dispatch
  const dispatch = useDispatch();
  // Custom CSS
  const classes = useStyles();

  const formSubmission = useSelector((store) => store.formSubmission);
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
        dispatch({ type: "CLEAR_FORM_SUBMISSION" });
        history.push(`/profile/${Number(params.id)}`);
      }
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

  const profileData = useSelector((store) => store.profileData);
  console.log(profileData);

  useEffect(() => {
    dispatch({ type: "GET_CREATE_PROFILE" });
  }, []);

  return (
    <>
      <div className="create-profile-container">
        <div className="create-form">
          <p>Profile Page</p>
          <form className="create-profile-page-form-container">
            {/* Need conditional Rendering,
            <TextField placeholder="Image" />

              Show image, if clicked, sweetalert popup */}
              <UsersFirstName />
            {/* <TextField
              required
              placeholder="First Name"
              //   onChange={handleFirstNameChange}
              value={profileData[0]?.users_first_name}
            /> */}
            <TextField
              placeholder="Last Name"
              //   onChange={handleLastNameChange}
              value={profileData[0]?.users_last_name}
            />
            <TextField
              required
              placeholder="Nickname"
              //   onChange={handleNicknameChange}
              value={profileData[0]?.users_nickname}
            />
            <TextField
              required
              placeholder="email"
              //   onChange={handleEmailChange}
              value={profileData[0]?.email}
            />
            <TextField
              placeholder="Phone #"
              value={profileData[0]?.phone_number}
            />

            <Button variant="outlined" onClick={handleCreateProfile}>
              Delete Profile
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
