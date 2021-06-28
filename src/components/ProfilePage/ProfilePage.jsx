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
import { UsersFirstName } from "./ProfilePageComponents/users.first.name";
import { UsersLastName } from "./ProfilePageComponents/users.last.name";
import { UsersNickName } from "./ProfilePageComponents/users.nickname";

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
  // Store area
  const profileData = useSelector((store) => store.profileData);
  const formSubmission = useSelector((store) => store.formSubmission);
  // Bring in params
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

  useEffect(() => {
    dispatch({ type: "GET_CREATE_PROFILE" });
  }, []);

  return (
    <>
      <div className="create-profile-container">
        <div className="create-form">
          <p>Profile Page</p>
          <form className="create-profile-page-form-container">
            <UsersFirstName />
            <UsersLastName />
            <UsersNickName />
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
