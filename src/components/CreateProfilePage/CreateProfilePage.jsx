import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

// Custom CSS
import "./CreateProfilePage.css";

// Components import Area
import { UsersFirstName } from "./CreateProfilePageComponents/users.first.name";
import { UsersLastName } from "./CreateProfilePageComponents/users.last.name";
import { UsersEmail } from "./CreateProfilePageComponents/users.email";
import { UsersNickname } from "./CreateProfilePageComponents/users.nickname";

// Material-ui Imports
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

// Sweetalert2
import Swal from "sweetalert2";

function CreateProfilePage() {
  const classes = useStyles();
  // Bring in useHistory
  const history = useHistory();
  // Bring in dispatch
  const dispatch = useDispatch();
  // We need to bring the store in.
  const formSubmission = useSelector((store) => store.formSubmission);
  const profileData = useSelector((store) => store.profileData);
  const [alertState, setAlertState] = useState(false);
  // Function to check valid email.
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  // Function to handle creation of profile
  // Sweet Alert to ask for confirmation
  const handleCreateProfile = () => {
    console.log(`You've clicked handleCreateProfile`);

    // We need a Valid email, else alert them they need one on confirmation.
    if (validateEmail(formSubmission.email)) {
      // Ask them nicely if they want to create Profile.
      Swal.fire({
        title: "Create Profile",
        text: `${formSubmission.first}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        allowOutsideClick: true,
        allowEnterKey: true,
        backdrop: true,
      }).then((result) => {
        // If result is confirmed, post to the database user_profile table
        if (result.isConfirmed) {
          console.log(formSubmission);
          dispatch({ type: "POST_CREATE_PROFILE", payload: formSubmission });
          history.push(`/profile`);
        }
      });
    } else {
      setAlertState(true);
    }
  };

  return (
    <>
      {/* No profile, redirect them to make one. */}
      {!profileData.length ? (
        <div className="create-profile-container">
          <div className="create-form">
            {!alertState ? (
              <p>Create Profile Page</p>
            ) : (
              <div className={classes.root}>
                <Alert severity="error">
                  Need Valid Email
                </Alert>
              </div>
            )}
            <form className="create-profile-page-form-container">
              <UsersFirstName />
              <UsersLastName />
              <UsersNickname />
              <UsersEmail setAlertState={setAlertState}/>

              <Button variant="outlined" onClick={handleCreateProfile}>
                Add
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <Redirect to="/profile" />
      )}
    </>
  );
}

export default CreateProfilePage;
