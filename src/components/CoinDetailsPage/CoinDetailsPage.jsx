import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useLocation } from "react-router";
import "./CoinDetailsPageCSS/CoinDetailsPage.css";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import BuyCoinButton from "./CoinDetailsPageComponents/BuyCoinButton";
import DeleteCoinButton from "./CoinDetailsPageComponents/DeleteCoinButton";
import NotesFromServer from "./CoinDetailsPageComponents/NotesFromServer";
import SellCoinButton from "./CoinDetailsPageComponents/SellCoinButton";

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
  const location = useLocation();
  console.log(location.pathname);
  // Set our coin info from coingecko api
  const [coinsFromGecko, setCoinsFromGecko] = useState([]);
  // Timer to update price from coin gecko api
  const [timer, setTimer] = useState(false);
  // Bring in Custom CSS classes
  const classes = useStyles();
  // Bring in params
  const params = useParams();
  //   console.log(params);
  // Bring in useHistory
  const history = useHistory();
  // Bring in dispatch
  const dispatch = useDispatch();
  // We need to bring the store in.
  const profileData = useSelector((store) => store.profileData);
  const user = useSelector((store) => store.user);
  // Function to handleSell click
  const handleSell = () => {
    console.log(`You clicked handleSell`);
  };

  // Function to handleDelete click
  const handleDelete = () => {
    console.log(`You clicked handleDelete`);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${params.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((response) => {
        setCoinsFromGecko(response.data);
        // setTimer(false);
        dispatch({ type: "CLEAR_COIN_INFO" });
      })
      .catch((error) => {
        console.log(`Ohh No, coingecko failed me! ${error}`);
        alert(`We've had problem, sorry`);
      });
    if (timer === false) {
      setInterval(() => {
        axios
          .get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${params.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
          )
          .then((response) => {
            setCoinsFromGecko(response.data);
            console.log(response.data)
          })
          .catch((error) => {
            console.log(`Ohh No, coingecko failed me! ${error}`);
            alert(`We've had problem, sorry`);
          });
      }, 10000);
    }
  }, []);
  // console.log(params);
  // console.log(location)
  useEffect(() => {
    dispatch({
      type: "FETCH_COIN_INFO",
      payload: { id: user.id, name: params.id },
    });
  }, []);

  return (
    <>
      {!profileData ? (
        <Redirect to="/createProfile" />
      ) : (
        <div className="coin-page-container">
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

            <h3>{coinsFromGecko[0]?.name}</h3>
            <p>
              {coinsFromGecko[0]?.current_price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <div className="buy-sell-delete-options-container">
              <BuyCoinButton useStyles={useStyles} Button={Button} />
              <SellCoinButton useStyles={useStyles} Button={Button} />
              <DeleteCoinButton useStyles={useStyles} Button={Button} />
            </div>

            <div>
              <p>{coinsFromGecko[0]?.name}</p>
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
