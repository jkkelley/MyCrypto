import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "../CreateProfilePage.css";

// Material-ui Imports
import TextField from "@material-ui/core/TextField";

import Swal from "sweetalert2";

export const UsersNickname = ({ classes }) => {
  // Hey store, we need a profile.
  const formSubmission = useSelector((store) => store.formSubmission);

  // Bring in dispatch
  const dispatch = useDispatch();

  const handleNickname = async () => {
    const { value: nickname } = await Swal.fire({
      title: "Nickname",
      input: "text",
      //   inputValue: formSubmission?.nickname,
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
    // nickname shows message showing name change.
    if (nickname) {
      Swal.fire({
        text: `Last Name: ${nickname}`,
      });
      // Dispatch Users Nickname and their id to reducer.
      dispatch({ type: "SET_NICKNAME_CREATE_PROFILE", payload: nickname });
    }
  };

  const handleNicknameChange = (event) => {
    event.preventDefault();
    dispatch({
      type: "SET_NICKNAME_CREATE_PROFILE",
      payload: event.target.value,
    });
  };

  return (
    <>
      <TextField
        className={classes.textStyling}
        fullWidth
        required
        placeholder="Nickname"
        onChange={handleNicknameChange}
        onClick={handleNickname}
        value={formSubmission?.nickname}
        disabled
      />
    </>
  );
};
