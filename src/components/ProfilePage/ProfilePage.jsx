import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

// Material-ui Imports
import Button from "@material-ui/core/Button";

// SweetAlert2
import Swal from "sweetalert2";

// ProfilePageComponents
import { UsersEmail } from "./ProfilePageComponents/profile.users.email";
import { UsersFirstName } from "./ProfilePageComponents/profile.users.first.name";
import { UsersLastName } from "./ProfilePageComponents/profile.users.last.name";
import { UsersNickName } from "./ProfilePageComponents/profile.users.nickname";
import { UsersPhoneNumber } from "./ProfilePageComponents/profile.users.phone.number";

function ProfilePage() {
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
          dispatch({ type: "CLEAR_PROFILE_INFO" });
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
        <div className="create-profile-container">
          <div className="create-form">
            <p>Profile Page</p>
            <form className="create-profile-page-form-container">
              <UsersFirstName />
              <UsersLastName />
              <UsersNickName />
              <UsersEmail />
              <UsersPhoneNumber />
              <Button variant="outlined" onClick={handleDeleteProfile}>
                Delete Profile
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
