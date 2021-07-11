import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";

import "../ProfilePage.css"

// Material-ui Imports
import TextField from "@material-ui/core/TextField";

import Swal from "sweetalert2";

export const UsersFirstName = ({ useStyles, classes }) => {
  useStyles();
  const params = useParams();

  // Hey store, we need a profile.
  const profileData = useSelector((store) => store.profileData);
  // Bring in dispatch
  const dispatch = useDispatch();

  const handleFirstName = async () => {
    const { value: firstName } = await Swal.fire({
      title: "First Name",
      input: "text",
      inputValue: profileData[0]?.users_first_name,
      showCancelButton: true,
      allowOutsideClick: true,
      allowEnterKey: true,
      backdrop: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    // firstName shows message showing name change.
    if (firstName) {
      Swal.fire({
        text: `First Name Changed to ${firstName}`,
      });
      // Dispatch Users First name and their id to Saga.
      dispatch({
        type: "UPDATE_PROFILE_PAGE",
        payload: { id: Number(params.id), first: firstName },
      });
      // Show Updated name after User changes name.
      dispatch({ type: "GET_CREATE_PROFILE" });
    }
  };
  useEffect(() => {
    dispatch({ type: "GET_CREATE_PROFILE" });
  }, []);
  return (
    <>
      <TextField
        className={classes.textStyling}
        fullWidth
        required
        placeHolder="First Name"
        onClick={handleFirstName}
        value={profileData[0]?.users_first_name}
      />
    </>
  );
};
