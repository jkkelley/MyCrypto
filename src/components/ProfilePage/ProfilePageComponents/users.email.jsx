import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Material-ui Imports
import TextField from "@material-ui/core/TextField";

import Swal from "sweetalert2";

export const UsersEmail = () => {
  const params = useParams();

  // Hey store, we need a profile.
  const profileData = useSelector((store) => store.profileData);
  // Bring in dispatch
  const dispatch = useDispatch();

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
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    // email shows message showing name change.
    if (email) {
      Swal.fire({
        text: `Email Changed to ${email}`,
      });
      // Dispatch Users email and their id to Saga.
      dispatch({ type: "UPDATE_PROFILE_PAGE", payload: { id: Number(params.id), email: email } });
      // Show Updated name after User changes name.
      dispatch({type: "GET_CREATE_PROFILE"})
    }
  };

  return (
    <>
      <TextField
        required
        placeholder="Email"
        onClick={handleEmail}
        value={profileData[0]?.email}
      />
    </>
  );
};
