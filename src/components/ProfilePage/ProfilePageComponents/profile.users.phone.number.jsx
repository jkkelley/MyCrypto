import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

// Material-ui Imports
import TextField from "@material-ui/core/TextField";

import Swal from "sweetalert2";

export const UsersPhoneNumber = () => {
  const params = useParams();

  // Hey store, we need a profile.
  const profileData = useSelector((store) => store.profileData);
  // Bring in dispatch
  const dispatch = useDispatch();
  // Function to handle valid loose phone numbers, below are valid numbers
  // (123) 456-7890
  // 123-456-7890
  // 123.456.7890
  // 1234567890

  function phoneNumberCheck(phoneNumber) {
    const regex =
      /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    return regex.test(phoneNumber);
  }

  const handlePhoneNumber = async () => {
    const { value: phone_number } = await Swal.fire({
      title: "Phone Number",
      input: "text",
      inputValue: profileData[0]?.phone_number,
      showCancelButton: true,
      allowOutsideClick: true,
      allowEnterKey: true,
      backdrop: true,
      inputValidator: (value) => {
        if (!phoneNumberCheck(value)) {
          return "We need a Valid Phone!\r\n eg. 777-777-7777";
        }
      },
    });
    // phone_number shows message showing name change.
    if (phone_number) {
      Swal.fire({
        text: `Phone number Changed to ${phone_number}`,
      });
      // Dispatch Users phone number and their id to Saga.
      dispatch({
        type: "UPDATE_PROFILE_PAGE",
        payload: { id: Number(params.id), phone_number: phone_number },
      });
      // Show Updated phone number after User changes name.
      dispatch({ type: "GET_CREATE_PROFILE" });
    }
  };
  useEffect(() => {
    dispatch({ type: "GET_CREATE_PROFILE" });
  }, []);
  return (
    <>
      <TextField
        required
        placeholder="Phone Number"
        onClick={handlePhoneNumber}
        value={profileData[0]?.phone_number}
      />
    </>
  );
};
