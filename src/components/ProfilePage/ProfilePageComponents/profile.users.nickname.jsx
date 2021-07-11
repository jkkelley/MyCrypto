import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../ProfilePage.css"

// Material-ui Imports
import TextField from "@material-ui/core/TextField";

import Swal from "sweetalert2";

export const UsersNickName = ({ useStyles, classes }) => {
  useStyles();
  const params = useParams();

  // Hey store, we need a profile.
  const profileData = useSelector((store) => store.profileData);
  // Bring in dispatch
  const dispatch = useDispatch();

  const handleNickName = async () => {
    const { value: nickname } = await Swal.fire({
      title: "Nickname",
      input: "text",
      inputValue: profileData[0]?.users_nickname,
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
        text: `Last Name Changed to ${nickname}`,
      });
      // Dispatch Users nickname and their id to Saga.
      dispatch({
        type: "UPDATE_PROFILE_PAGE",
        payload: { id: Number(params.id), nickname: nickname },
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
        placeHolder="Nickname"
        onClick={handleNickName}
        value={profileData[0]?.users_nickname}
      />
    </>
  );
};
