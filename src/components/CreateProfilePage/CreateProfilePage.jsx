import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useLocation, useParams } from "react-router-dom";

// Custom CSS
import "./CreateProfilePage.css";

// Components import Area
import { UsersFirstName } from "./CreateProfilePageComponents/create.profile.users.first.name";
import { UsersLastName } from "./CreateProfilePageComponents/create.profile.users.last.name";
import { UsersEmail } from "./CreateProfilePageComponents/create.profile.users.email";
import { UsersNickname } from "./CreateProfilePageComponents/create.profile.users.nickname";
import NavDrawer from "../NavDrawer/NavDrawer";
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
  input: {
    "&::placeholder": {
      fontStyle: "italic",
    },
  },
  profilePageWrapper: {
    margin: "60px auto",
  },
  buttonStyling: {
    backgroundColor: "#3f51b5",
    color: "white",
  },
  textStyling: {
    margin: "5px auto",
    color: "black",
    input: {
      "&::placeHolder": {
        fontStyle: "italic",
        color: "black",
        fontFamily: '"Exo", sans-serif',
      },
    },
  },
  profileForm: {
    margin: "5px auto",
  },
  buttonStyling: {
    backgroundColor: "#3f51b5",
    color: "white",
  },
}));

// Sweetalert2
import Swal from "sweetalert2";

function CreateProfilePage() {
  // Bring Location in
  const location = useLocation();
  // Bring in Params
  const params = useParams();
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

  // Hidden Button to fill in form
  const handleLukeButton = () => {
    console.log(`button clicked`);
    dispatch({ type: "SET_FIRST_NAME_CREATE_PROFILE", payload: "Luke" });
    dispatch({ type: "SET_LAST_NAME_CREATE_PROFILE", payload: "Kelley" });
    dispatch({ type: "SET_NICKNAME_CREATE_PROFILE", payload: "SuperLu12" });
    dispatch({
      type: "SET_EMAIL_CREATE_PROFILE",
      payload: "super.lu12@gmail.com",
    });
  };

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
  console.log(location.pathname);
  useEffect(() => {
    /**
     * Dispatch Location reducer current location
     */
    dispatch({ type: "CURRENT_USER_LOCATION", payload: location.pathname });
  }, []);

  return (
    <>
      {/* No profile, redirect them to make one. */}
      {!profileData.length ? (
        <div className="create-profile-container">
          <NavDrawer props={true} />
          <div className="lucas-quick-login-button">
            <button
              className="luke-button"
              onClick={handleLukeButton}
              width="30px"
            >
              Luke
            </button>
          </div>
          <div className="create-form">
            {!alertState ? (
              <p>Create Profile Page</p>
            ) : (
              <div className={classes.root}>
                <Alert severity="error">Need Valid Email</Alert>
              </div>
            )}
            <div className={classes.profileForm}>
              <UsersFirstName classes={classes} />
              <UsersLastName classes={classes} />
              <UsersNickname classes={classes} />
              <UsersEmail classes={classes} setAlertState={setAlertState} />
            </div>

            <Button
              className={classes.buttonStyling}
              variant="outlined"
              onClick={handleCreateProfile}
            >
              Add
            </Button>
          </div>
        </div>
      ) : (
        <Redirect to="/homePage" />
      )}
    </>
  );
}

export default CreateProfilePage;
