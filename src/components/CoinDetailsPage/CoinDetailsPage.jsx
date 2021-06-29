import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

// Custom CSS

// Components import Area

// Material-ui Imports
import Button from "@material-ui/core/Button";
// Sweetalert2
import Swal from "sweetalert2";

function CoinDetailsPage() {
  // Bring in useHistory
  const history = useHistory();
  // Bring in dispatch
  const dispatch = useDispatch();
  // We need to bring the store in.
  const profileData = useSelector((store) => store.profileData);
  return (
    <>
      <p>Coin Details Page</p>
    </>
  );
}

export default CoinDetailsPage;
