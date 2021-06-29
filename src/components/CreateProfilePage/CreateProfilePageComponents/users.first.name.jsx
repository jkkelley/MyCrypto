import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHistory, useParams } from "react-router-dom";

// Material-ui Imports
import TextField from "@material-ui/core/TextField";

import Swal from "sweetalert2";


export const UsersFirstName = () => {
  const params = useParams();

  // Hey store, we need a profile.
  const profileData = useSelector((store) => store.profileData);
  const formSubmission = useSelector((store) => store.formSubmission);

  // Bring in dispatch
  const dispatch = useDispatch();

  const handleFirstName = async () => {
    const { value: firstName } = await Swal.fire({
      title: "First Name",
      input: "text",
      // inputValue: formSubmission?.first,
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
        text: `First Name: ${firstName}`,
      });
      // Dispatch Users First name and their id to reducer.
      dispatch({ type: "SET_FIRST_NAME_CREATE_PROFILE", payload: firstName });

    }
  };

  const handleFirstNameChange = (event) => {
    event.preventDefault();
    dispatch({
      type: "SET_FIRST_NAME_CREATE_PROFILE",
      payload: event.target.value,
    });
  };

  return (
    <>
      <TextField
        required
        placeholder="First Name"
        onClick={handleFirstName}
        onChange={handleFirstNameChange}
        value={formSubmission?.first}
      />
    </>
  );
};
