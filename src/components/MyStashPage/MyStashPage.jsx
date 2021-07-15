import { useDispatch, useSelector } from "react-redux";
import { Redirect} from "react-router-dom";
import React, { useEffect} from "react";

import "./MyStashPageCSS/MyStashPage.css";

// Components import Area
import MyStashCoinsTable from "../MyStashPage/MyStashPageComponents/mystash.coins.table";
import NavDrawer from "../NavDrawer/NavDrawer";

function MyStashPage() {


  // We need to bring the store in.
  const profileData = useSelector((store) => store.profileData);
  const user = useSelector((store) => store.user);
  const myStashReducer = useSelector((store) => store.myStashReducer);
  const myStashCoinPriceReducer = useSelector(
    (store) => store.myStashCoinPriceReducer
  );
  console.log(`mystash => `, myStashReducer);
  console.log(`myStashCoinPriceReducer => `, myStashCoinPriceReducer);

  // Bringing in dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "GET_MYSTASH_PAGE_DETAILS",
      payload: { user_id: user.id },
    });
  }, []);

  return (
    <>
      <div className="my-stash-wrapper">
        {!profileData.length ? (
          <Redirect to="/createProfile" />
        ) : (
          <div className="my-stash-page-container">
            <NavDrawer props={true} />
            <h3>Welcome to My Stash</h3>

            {/* MyStash Balance */}
            {!myStashReducer.length ? (
              <>
                <div className="my-stash-balance-container">
                  <div className="my-stash-balances-fake-data">
                    <h5>MyStash Balance</h5>
                    <p>$0.00</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="my-stash-balance-container">
                  <div className="my-stash-balances">
                    <h5>MyStash Balance</h5>
                    <p>
                      {myStashCoinPriceReducer.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="account-balance-container">
              {/* Account Balance */}
              <h5>User Account Balance</h5>
              <p>
                {Number(profileData[0]?.account_balance).toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}
              </p>
            </div>

            {/* Component, table to map over user owned coins */}
            <div>
              {myStashReducer.map((coins) => (
                <MyStashCoinsTable coins={coins} key={coins.id} />
              ))}
            </div>
          </div>
        )}
        <div className="hidden-gem">hello</div>
      </div>
    </>
  );
}

export default MyStashPage;
