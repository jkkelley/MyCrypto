import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Material-ui Imports
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export const UsersLastName = () => {
  const params = useParams();

  // Material-ui CSS
  const classes = useStyles();
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
    // firstName shows message showing name change.
    if (lastName) {
      Swal.fire({
        text: `Last Name Changed to ${lastName}`,
      });
      // Dispatch Users First name and their id to Saga.
      dispatch({ type: "UPDATE_PROFILE_PAGE", payload: { id: Number(params.id), last: lastName } });
      // Show Updated name after User changes name.
      dispatch({type: "GET_CREATE_PROFILE"})

    }
  };

  return (
    <>
      <TextField
        required
        placeholder="First Name"
        onClick={handleLastName}
        value={profileData[0]?.users_last_name}
      />
    </>
  );
};
