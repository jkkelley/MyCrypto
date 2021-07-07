import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./MyStashPageCSS/MyStashPage.css";

// Components import Area
import MyStashCoinsTable from "../MyStashPage/MyStashPageComponents/mystash.coins.table";
import NavDrawer from "../NavDrawer/NavDrawer";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
function MyStashPage() {

  
  // Return Time back right now.
  let timeNow = new Date(Date.now() - 18_000_000);
  console.log(`Time now>`, timeNow)
  // Return timeNow back as string, slice first 11 indices off, and last 8 indices
  // Returns time back in HOUR:MINUTE FORMAT.
  console.log(`Time right now => `, timeNow.toISOString().slice(11, -8));
  console.log(`Time right now => `, timeNow.toISOString());

  // console.log(`Time 24 hours ago => `, (timeNow - 86_400_000))
  /**
   * Math area
   * 86_400 seconds in a day, 1000 ms in one second
   * 86_400 * 1000 = 86_400_000 in one day
   * 
   */

  // Ok this is going to be nasty, brains fried and I'm on hour 12 of coding
  // Come back and refactor this code at a later time.
  let timeTwentyThree = new Date((Date.now() - 18_000_000) - 82_800_000);
  console.log(`23 hours ago => `, timeTwentyThree.toISOString().slice(11, -8))
  // let timeYesterday = new Date((Date.now() - 82_800_000)).toISOString().slice(11, -8);
  // console.log(`Time 24 hours ago => `, timeYesterday);

  // We need to bring the store in.
  const profileData = useSelector((store) => store.profileData);
  const user = useSelector((store) => store.user);
  const coinInfoReducer = useSelector((store) => store.coinInfoReducer);
  const myStashReducer = useSelector((store) => store.myStashReducer);
  const myStashCoinPriceReducer = useSelector(
    (store) => store.myStashCoinPriceReducer
  );
  console.log(`mystash => `, myStashReducer);
  console.log(`myStashCoinPriceReducer => `, myStashCoinPriceReducer);

  // Bringing in dispatch
  const dispatch = useDispatch();

  // Local State for Chart
  const [chartData, setChartData] = useState({});
  const chart = () => {
    setChartData({
      labels: [],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  useEffect(async () => {
    await dispatch({
      type: "GET_MYSTASH_PAGE_DETAILS",
      payload: { user_id: user.id },
    });
  }, []);

  return (
    <>
      {!profileData ? (
        <Redirect to="/createProfile" />
      ) : (
        <div className="my-stash-page-container">
          <NavDrawer props={true} />
          <h3>Welcome to My Stash</h3>

          {/* MyStash Balance */}
          <div className="my-stash-balance-container">
            {!myStashReducer ? (
              "$0.00"
            ) : (
              <>
                <h5>MyStash Balance</h5>
                <p>
                  {myStashCoinPriceReducer.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </>
            )}
          </div>
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
            <Line />
          </div>

          {/* Component, table to map over user owned coins */}
          <div>
            {myStashReducer.map((coins) => (
              <MyStashCoinsTable coins={coins} key={coins.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MyStashPage;
