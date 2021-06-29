import React, {useEffect} from "react";
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
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    // phone_number shows message showing name change.
    if (phone_number) {
      Swal.fire({
        text: `Phone number Changed to ${phone_number}`,
      });
      // Dispatch Users phone number and their id to Saga.
      dispatch({ type: "UPDATE_PROFILE_PAGE", payload: { id: Number(params.id), phone_number: phone_number } });
      // Show Updated phone number after User changes name.
      dispatch({type: "GET_CREATE_PROFILE"})
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
