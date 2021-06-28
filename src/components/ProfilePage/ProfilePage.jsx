import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

// Material-ui Imports
import Button from "@material-ui/core/Button";

// SweetAlert2
import Swal from "sweetalert2";

// ProfilePageComponents
import { UsersEmail } from "./ProfilePageComponents/users.email";
import { UsersFirstName } from "./ProfilePageComponents/users.first.name";
import { UsersLastName } from "./ProfilePageComponents/users.last.name";
import { UsersNickName } from "./ProfilePageComponents/users.nickname";
import { UsersPhoneNumber } from "./ProfilePageComponents/users.phone.number";

function ProfilePage() {
  // Bring in params
  const params = useParams();
  // Bring in dispatch
  const dispatch = useDispatch();

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
          dispatch({ type: "DELETE_USERS_PROFILE", payload: params.id });
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
    </>
  );
}

export default ProfilePage;
