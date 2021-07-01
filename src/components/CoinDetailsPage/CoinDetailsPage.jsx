import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect, useLocation } from "react-router-dom";

import "./CoinDetailsPageCSS/CoinDetailsPage.css";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import BuyCoinButton from "./CoinDetailsPageComponents/BuyCoinButton";
import DeleteCoinButton from "./CoinDetailsPageComponents/DeleteCoinButton";
import NotesFromServer from "./CoinDetailsPageComponents/NotesFromServer";
import SellCoinButton from "./CoinDetailsPageComponents/SellCoinButton";
import NavDrawer from "../NavDrawer/NavDrawer";
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

// Custom CSS

// Components import Area

// Material-ui Imports
import Button from "@material-ui/core/Button";
// Sweetalert2
import Swal from "sweetalert2";
import { TextField, useRadioGroup } from "@material-ui/core";
import { History101 } from "react-router-dom";

function CoinDetailsPage() {
  // Bring Location in
  const location = useLocation();
  // Set our coin info from coingecko api
  const [coinsFromGecko, setCoinsFromGecko] = useState([]);
  // Timer to update price from coin gecko api
  const [timer, setTimer] = useState(false);
  const [amountUndefined, setAmountUndefined] = useState(false);
  const [amountOwned, setAmountOwned] = useState(false);

  // Bring in Custom CSS classes
  const classes = useStyles();
  // Bring in params
  const params = useParams();
  console.log(location);
  // Bring in useHistory
  const history = useHistory();
  // Bring in dispatch
  const dispatch = useDispatch();
  // We need to bring the store in.
  const profileData = useSelector((store) => store.profileData);
  const user = useSelector((store) => store.user);
  const coinInfoReducer = useSelector((store) => store.coinInfoReducer);

  // Function to handleSell click
  const handleSell = () => {
    console.log(`You clicked handleSell`);
  };

  // Function to handleDelete click
  const handleDelete = () => {
    console.log(`You clicked handleDelete`);
  };

  useEffect(() => {
    if (location.pathname == `/coinDetails/${params.id}`) {
      setInterval(() => {
        // try {
        //   axios
        //     .get(
        //       `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${params.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        //     )
        //     .then((response) => {
        //       setCoinsFromGecko(response.data);
        //     })

        //     .catch((error) => {
        //       console.log(`Ohh No, coingecko failed me! ${error}`);
        //       alert(`We've had problem, sorry`);
        //     });
        // } catch (error) {
        //   console.log(`Error`);
        // }
        try {
          axios
            .get(
              `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${params.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
            )
            .then((response) => {
              setCoinsFromGecko(response.data);
              setAmountUndefined(true);
              console.log(`Line 112 Dispatched`);
              dispatch({
                type: "FETCH_COIN_INFO",
                payload: { id: user.id, name: params.id },
              });
            })
            .catch((error) => {
              console.log(`Ohh No, coingecko failed me! ${error}`);
              // alert(`We've had problem, sorry`);
            });
        } catch (error) {
          console.log(`Error`);
        }
      }, 10000);
    } else {
      clearInterval(() => {
        dispatch({ type: "CLEAR_CURRENT_USER_LOCATION" });
      });
    }
  }, []);

  const [initialState, setInitialState] = useState(true);
  useEffect(() => {
    // dispatch({ type: "CURRENT_USER_LOCATION" , payload: });
    if (initialState) {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${params.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        )
        .then((response) => {
          setCoinsFromGecko(response.data);
          setInitialState(!initialState);
        })

        .catch((error) => {
          console.log(`Ohh No, coingecko failed me! ${error}`);
          alert(`We've had problem, sorry`);
        });

      // axios
      //   .get(
      //     `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${params.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      //   )
      //   .then((response) => {
      //     setCoinsFromGecko(response.data);
      //     setAmountUndefined(true);
      //     console.log(`Line 112 Dispatched`);
      //     dispatch({
      //       type: "FETCH_COIN_INFO",
      //       payload: { id: user.id, name: params.id },
      //     });
      //     console.log(`is this firing`);
      //     console.log(coinInfoReducer?.value_of_amount_owned);

      //     console.log(amountOwned);
      //   })
      //   .catch((error) => {
      //     console.log(`Ohh No, coingecko failed me! ${error}`);
      //     // alert(`We've had problem, sorry`);
      //   });
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

  // useEffect(() => {
  //   dispatch({ type: "CLEAR_COIN_INFO" });

  //   dispatch({
  //     type: "FETCH_COIN_INFO",
  //     payload: { id: user.id, name: params.id },
  //   });
  // }, []);

  useEffect(() => {
    /**
     * Dispatch Location reducer current location
     */
    dispatch({ type: "CURRENT_USER_LOCATION", payload: location.pathname });
  }, []);
  console.log(coinInfoReducer?.amount_owned);
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
              <h5>Balance</h5>
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
            <div>
              <p>PLACE HOLDER FOR CHART</p>
            </div>
            <h3>{coinsFromGecko[0]?.name}</h3>
            <p>
              {coinsFromGecko[0]?.current_price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <div className="buy-sell-delete-options-container">
              {!amountOwned ? (
                <BuyCoinButton useStyles={useStyles} Button={Button} />
              ) : (
                <p>hello</p>
              )}
              <SellCoinButton useStyles={useStyles} Button={Button} />
              <DeleteCoinButton useStyles={useStyles} Button={Button} />
            </div>

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
                {Number(
                  coinInfoReducer?.amount_owned[0]?.amount_owned.toLocaleString(
                    {
                      style: "currency",
                      currency: "USD",
                    }
                  )
                )}
              </p>
            </div>

            <div className="notes-container">
              <NotesFromServer />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CoinDetailsPage;
