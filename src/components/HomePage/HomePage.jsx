import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

// Material-ui Imports
import Button from "@material-ui/core/Button";

// SweetAlert2
import Swal from "sweetalert2";

function HomePage() {
  const profileData = useSelector((store) => store.profileData);
  return (
    <>
      <div>
        <h3>Welcome</h3>
        <p>{profileData[0]?.users_nickname}</p>
      </div>
      <br></br>
      <div>
        <h3>Balance</h3>
        <p>
          {Number(profileData[0]?.account_balance).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
    </>
  );
}

export default HomePage;
