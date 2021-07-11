import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../ProfilePage.css"

// Material-ui Imports
import TextField from "@material-ui/core/TextField";

import Swal from "sweetalert2";

export const UsersEmail = ({ useStyles, classes }) => {
  useStyles();
  const params = useParams();

  // Hey store, we need a profile.
  const profileData = useSelector((store) => store.profileData);
  // Bring in dispatch
  const dispatch = useDispatch();
  // Function to check for valid email address.
  function validateEmail(email) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  const handleEmail = async () => {
    const { value: email } = await Swal.fire({
      title: "Email",
      input: "email",
      inputValue: profileData[0]?.email,
      showCancelButton: true,
      allowOutsideClick: true,
      allowEnterKey: true,
      backdrop: true,
      inputValidator: (value) => {
        if (!validateEmail(value)) {
          console.log(value);
          return "Need a Valid Email Address!";
        }
      },
    });
    // email shows message showing name change.
    if (email) {
      Swal.fire({
        text: `Email Changed to ${email}`,
      });
      // Dispatch Users email and their id to Saga.
      dispatch({
        type: "UPDATE_PROFILE_PAGE",
        payload: { id: Number(params.id), email: email },
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
        placeholder="Email"
        onClick={handleEmail}
        value={profileData[0]?.email}
      />
    </>
  );
};
