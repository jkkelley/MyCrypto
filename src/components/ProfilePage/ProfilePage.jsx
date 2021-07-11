import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

import "./ProfilePage.css";

// Material-ui Imports
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// SweetAlert2
import Swal from "sweetalert2";

// ProfilePageComponents
import { UsersEmail } from "./ProfilePageComponents/profile.users.email";
import { UsersFirstName } from "./ProfilePageComponents/profile.users.first.name";
import { UsersLastName } from "./ProfilePageComponents/profile.users.last.name";
import { UsersNickName } from "./ProfilePageComponents/profile.users.nickname";
import { UsersPhoneNumber } from "./ProfilePageComponents/profile.users.phone.number";
import NavDrawer from "../NavDrawer/NavDrawer";

const useStyles = makeStyles((theme) => ({
  profilePageWrapper: {
    margin: "60px auto",
  },
  buttonStyling: {
    backgroundColor: "#3f51b5",
    color: "white",
  },
  textStyling: {
    margin: "5px auto",
    fontFamily: '"Exo", sans-serif',
  },
  profileForm: {
    margin: "5px auto",
  },
}));

function ProfilePage() {
  // Custom CSS
  const classes = useStyles();
  // Bring in user profileData, gotta keep those lurkers out...
  const profileData = useSelector((store) => store.profileData);

  // Bring in params
  const params = useParams();
  // Bring in dispatch
  const dispatch = useDispatch();
  // Bring in history
  const history = useHistory();

  // Function to handle Delete Profile
  const handleDeleteProfile = () => {
    console.log(`You've clicked handleDeleteProfile`);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      allowOutsideClick: true,
      allowEnterKey: true,
      backdrop: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your Profile has been deleted.", "success");
          dispatch({
            type: "DELETE_USERS_PROFILE",
            payload: Number(profileData[0].users_id),
          });
          dispatch({ type: "CLEAR_MYSTASH_COINS" });
          dispatch({ type: "CLEAR_PROFILE_INFO" });
          dispatch({ type: "CLEAR_MYSTASH_COINS" });
          history.push(`/createProfile`);
        }
      })
      .catch((error) => {
        console.log(`Sorry we had a problem handling you're request.`, error);
      });
  };

  useEffect(() => {
    dispatch({ type: "GET_CREATE_PROFILE" });
  }, []);

  return (
    <>
      {!profileData.length ? (
        <Redirect to="/createProfile" />
      ) : (
        <div className={classes.profilePageWrapper}>
          <div className="create-profile-container">
            <NavDrawer props={true} />
            <div className="create-form">
              <h3>Profile Page</h3>
              <div className={classes.profileForm}>
                <UsersFirstName useStyles={useStyles} classes={classes} />
                <UsersLastName useStyles={useStyles} classes={classes} />
                <UsersNickName useStyles={useStyles} classes={classes} />
                <UsersEmail useStyles={useStyles} classes={classes} />
                <UsersPhoneNumber useStyles={useStyles} classes={classes} />
              </div>
              <Button
                className={classes.buttonStyling}
                variant="outlined"
                onClick={handleDeleteProfile}
              >
                Delete Profile
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
