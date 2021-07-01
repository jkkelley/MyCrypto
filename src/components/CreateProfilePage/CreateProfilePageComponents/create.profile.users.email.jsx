import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Material-ui Imports
import TextField from "@material-ui/core/TextField";

import Swal from "sweetalert2";

export const UsersEmail = ({setAlertState}) => {
  // Hey store, we need formSubmission.
  const formSubmission = useSelector((store) => store.formSubmission);

  // Bring in dispatch
  const dispatch = useDispatch();
  // Function to check for valid email address.
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const handleEmail = async () => {
    const { value: email } = await Swal.fire({
      title: "Email",
      input: "email",
      //   inputValue: formSubmission?.email,
      showCancelButton: true,
      allowOutsideClick: true,
      allowEnterKey: true,
      backdrop: true,
      inputValidator: (value) => {
        if (!validateEmail(value)) {
          return "Need a Valid Email Address!";
        }
      },
    });
    // email shows message showing name change.
    if (email) {
      Swal.fire({
        text: `Email: ${email}`,
      });
      setAlertState(false);
      // Dispatch Users Email and their id to reducer.
      dispatch({ type: "SET_EMAIL_CREATE_PROFILE", payload: email });
    }
  };

  const handleEmailChange = (event) => {
    event.preventDefault();
    dispatch({
      type: "SET_EMAIL_CREATE_PROFILE",
      payload: event.target.value,
    });
  };

  return (
    <>
      <TextField
        required
        placeholder="Email"
        onChange={handleEmailChange}
        onClick={handleEmail}
        value={formSubmission?.email}
        disabled
      />
    </>
  );
};
