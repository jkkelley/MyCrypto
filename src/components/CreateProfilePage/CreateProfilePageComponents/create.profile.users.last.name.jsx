import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

// Material-ui Imports
import TextField from "@material-ui/core/TextField";

import Swal from "sweetalert2";


export const UsersLastName = () => {
  const params = useParams();

  // Hey store, we need a profile.
  const profileData = useSelector((store) => store.profileData);
  const formSubmission = useSelector((store) => store.formSubmission);

  // Bring in dispatch
  const dispatch = useDispatch();

  const handleFirstName = async () => {
    const { value: lastName } = await Swal.fire({
      title: "Last Name",
      input: "text",
    //   inputValue: formSubmission?.last,
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
        text: `Last Name: ${lastName}`,
      });
      // Dispatch Users Last name and their id to reducer.
      dispatch({ type: "SET_LAST_NAME_CREATE_PROFILE", payload: lastName });

    }
  };

  const handleLastNameChange = (event) => {
    event.preventDefault();
    dispatch({
      type: "SET_LAST_NAME_CREATE_PROFILE",
      payload: event.target.value,
    });
  };

  return (
    <>
      <TextField
        required
        placeholder="Last Name"
        onChange={handleLastNameChange}
        onClick={handleFirstName}
        value={formSubmission?.last}
        disabled
      />
    </>
  );
};
