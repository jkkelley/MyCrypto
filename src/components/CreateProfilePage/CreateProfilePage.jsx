import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

import "./CreateProfilePage.css";

import { UsersFirstName } from "./CreateProfilePageComponents/users.first.name";
import { UsersLastName } from "./CreateProfilePageComponents/users.last.name";
import { UsersEmail } from "./CreateProfilePageComponents/users.email";
import { UsersNickname } from "./CreateProfilePageComponents/users.nickname";

// Material-ui Imports
import Button from "@material-ui/core/Button";
// Sweetalert2
import Swal from "sweetalert2";

function CreateProfilePage() {
  // Bring in useHistory
  const history = useHistory();
  // Bring in dispatch
  const dispatch = useDispatch();

  const formSubmission = useSelector((store) => store.formSubmission);
  const profileData = useSelector((store) => store.profileData);
  const params = useParams();

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  console.log(formSubmission.email);
  // Function to handle creation of profile
  // Sweet Alert to ask for confirmation
  const handleCreateProfile = () => {
    console.log(`You've clicked handleCreateProfile`);

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
        console.log(result);
        if (result.isConfirmed) {
          console.log(formSubmission);
          dispatch({ type: "POST_CREATE_PROFILE", payload: formSubmission });
          // dispatch({type: "SET_PROFILE_INFO"})
          history.push(`/profile`);
        }
      });
    } else {
      alert("Need a Valid Email Address!")
    }
  };

  return (
    <>
      {/* No profile, redirect them to make one. */}
      {!profileData.length ? (
        <div className="create-profile-container">
          <div className="create-form">
            <p>Create Profile Page</p>
            <form className="create-profile-page-form-container">
              <UsersFirstName />
              <UsersLastName />
              <UsersNickname />
              <UsersEmail />

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
