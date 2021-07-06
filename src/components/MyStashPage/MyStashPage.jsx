import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

// Components import Area
import NavDrawer from "../NavDrawer/NavDrawer";

function MyStashPage() {
  // We need to bring the store in.
  const profileData = useSelector((store) => store.profileData);
  const user = useSelector((store) => store.user);
  const coinInfoReducer = useSelector((store) => store.coinInfoReducer);

  // Bring in dispatch
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: "GET_MYSTASH_PAGE_DETAILS",
  //     payload: { id: user.id },
  //   });
  // }, []);
  return (
    <>
      {!profileData ? (
        <Redirect to="/createProfile" />
      ) : (
        <div>
          <NavDrawer props={true} />
          <p>Welcome to My Stash</p>
          <div className="account-balance-container">
            {/* Account Balance */}
            <h5>User Balance</h5>
            <p>
              {Number(profileData[0]?.account_balance).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>

          {/* PlaceHolder for chart */}
          <div>
            <p>Chart</p>
          </div>

          {/* Component, table to map over user owned coins */}
        </div>
      )}
    </>
  );
}

export default MyStashPage;