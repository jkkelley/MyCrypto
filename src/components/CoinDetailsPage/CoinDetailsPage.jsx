import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./CoinDetailsPageCSS/CoinDetailsPage.css";
import axios from "axios";

// Components import Area
import BuyCoinButton from "./CoinDetailsPageComponents/BuyCoinButton";
import BuyMoreCoinsButton from "./CoinDetailsPageComponents/BuyMoreCoinsButton";
import CoinPageNotes from "./CoinDetailsPageComponents/CoinPageNotes";
import DeleteCoinButton from "./CoinDetailsPageComponents/DeleteCoinButton";
import NavDrawer from "../NavDrawer/NavDrawer";
import NotesFromServer from "./CoinDetailsPageComponents/NotesFromServer";
import SellCoinButton from "./CoinDetailsPageComponents/SellCoinButton";
// Material-ui Imports
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root1: {
    background: "linear-gradient(45deg, #003366 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 30,
    width: 50,
    padding: "0 30px",
  },
  root2: {
    background: "linear-gradient(45deg, #FF8E53 30%, #003366 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 30,
    width: 50,
    padding: "0 30px",
  },
});

function CoinDetailsPage({ coins }) {
  // We need to bring the store in.
  const profileData = useSelector((store) => store.profileData);
  const user = useSelector((store) => store.user);
  const coinInfoReducer = useSelector((store) => store.coinInfoReducer);
  const coinNotes = useSelector((store) => store.coinNotes);
  const currentUserLocationReducer = useSelector(
    (store) => store.currentUserLocationReducer
  );
  // Bring Location in
  const location = useLocation();

  // State Holding Area
  // Set our coin info from coingecko api
  const [coinsFromGecko, setCoinsFromGecko] = useState([]);
  const [amountUndefined, setAmountUndefined] = useState(false);
  const [amountOwned, setAmountOwned] = useState(
    coinInfoReducer[0]?.amount_owned?.crypto_name
  );

  // Bring in params
  const params = useParams();

  // Bring in useHistory
  const history = useHistory();
  // Bring in dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${params.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        )
        .then((response) => {
          setCoinsFromGecko(response.data);
          setAmountUndefined(true);

          console.log(`Line 104 Dispatched`);
          dispatch({
            type: "FETCH_COIN_INFO2",
            payload: { id: user.id, crypto_name: params.id },
          });
        })
        .catch((error) => {
          console.log(`Ohh No, coingecko failed me! ${error}`);
        });
    } catch (error) {
      console.log(`Error`);
    }
  }, []);

  const handleAsyncIssues = () => {
    if (coinInfoReducer.value_of_amount_owned == undefined) {
      console.log(`It was undefined`);
      setAmountUndefined(false);
    } else {
      setAmountUndefined(true);
    }
  };

  const handleCoinReducerIssues = () => {
    if (coinInfoReducer.amount_owned == undefined) {
      setAmountOwned(false);
    } else {
      setAmountOwned(true);
    }
  };
  useEffect(() => {
    handleCoinReducerIssues();
    handleAsyncIssues();
  });

  useEffect(() => {
    // Dispatch Location reducer current location
    dispatch({ type: "CURRENT_USER_LOCATION", payload: location.pathname });
  }, []);

  return (
    <>
      {!profileData ? (
        <Redirect to="/createProfile" />
      ) : (
        <div className="coin-page-container">
          <NavDrawer props={true} />

          <div className="coin-page-details-container">
            <h2>Coin Details Page</h2>
            <div className="account-balance-container">
              <h5>User Balance</h5>
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

            {/* Chart of Coin data */}
            <div>
              <p>PLACE HOLDER FOR CHART</p>
            </div>

            {/* Name of coin and current price on page load. */}
            <div>
              <h3>{coinsFromGecko[0]?.name}</h3>
              <p>
                {coinsFromGecko[0]?.current_price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>

            {/* If the User doesn't own any coins, disable user coin section */}
            <div className="buy-sell-delete-options-container">
              {!amountOwned ? (
                <BuyCoinButton
                  useStyles={useStyles}
                  Button={Button}
                  coinsFromGecko={coinsFromGecko}
                />
              ) : (
                <>
                  {/* User Coin Section */}
                  <BuyMoreCoinsButton Button={Button} useStyles={useStyles} />
                  <SellCoinButton useStyles={useStyles} Button={Button} />
                  <DeleteCoinButton
                    coins={coins}
                    useStyles={useStyles}
                    Button={Button}
                  />
                </>
              )}
            </div>

            {coinInfoReducer && coinInfoReducer.amount_owned ? (
              <div>
                <p>{coinsFromGecko[0]?.name}</p>
                <p>
                  {coinInfoReducer?.value_of_amount_owned?.toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "USD",
                    }
                  )}
                </p>
                <p>
                  {coinInfoReducer?.amount_owned[0]?.amount_owned?.toLocaleString(
                    { minimumFractionDigits: 0, maximumFractionDigits: 8 }
                  )}
                </p>
              </div>
            ) : (
              <p>$0.00</p>
            )}

            {/* If user doesn't own any coins, don't display Notes section */}
            {!amountOwned ? (
              <p></p>
            ) : (
              <>
                <div className="notes-container">
                  <NotesFromServer />
                </div>

                <div>
                  {coinNotes?.map((notes, index) => {
                    return (
                      <CoinPageNotes key={index} index={index} notes={notes} />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CoinDetailsPage;
