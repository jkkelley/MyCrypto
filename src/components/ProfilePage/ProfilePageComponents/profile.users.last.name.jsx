import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../ProfilePage.css"

// Material-ui Imports
import TextField from "@material-ui/core/TextField";

import Swal from "sweetalert2";

export const UsersLastName = ({ useStyles, classes }) => {
  useStyles();
  const params = useParams();

  // Hey store, we need a profile.
  const profileData = useSelector((store) => store.profileData);
  // Bring in dispatch
  const dispatch = useDispatch();

  const handleLastName = async () => {
    const { value: lastName } = await Swal.fire({
      title: "Last Name",
      input: "text",
      inputValue: profileData[0]?.users_last_name,
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
    // lastName shows message showing name change.
    if (lastName) {
      Swal.fire({
        text: `Last Name Changed to ${lastName}`,
      });
      // Dispatch Users last name and their id to Saga.
      dispatch({
        type: "UPDATE_PROFILE_PAGE",
        payload: { id: Number(params.id), last: lastName },
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
        placeHolder="Last Name"
        onClick={handleLastName}
        value={profileData[0]?.users_last_name}
      />
    </>
  );
};
