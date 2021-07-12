import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./CoinDetailsPageCSS/CoinDetailsPage.css";
import axios from "axios";

// Components import Area
import ChartData from "../ChartData/ChartData";
import CoinDetailsCard from "./CoinDetailsPageComponents/CoinDetailsCard";
// import CoinCardDetails from "./CoinDetailsPageComponents/CoinCardDetails";
import CoinPageButtonOptions from "./CoinDetailsPageComponents/CoinPageButtonOptions";
import CoinPageNotes from "./CoinDetailsPageComponents/CoinPageNotes";
import NavDrawer from "../NavDrawer/NavDrawer";
import NotesFromServer from "./CoinDetailsPageComponents/NotesFromServer";
import PriceOfCoin from "./CoinDetailsPageComponents/PriceOfCoin";

// Material-ui Imports
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  table: {
    width: 380,
    boxShadow: "0 1px 2px 1px #3f51b5",
    marginTop: "10px",
    borderColor: "none",
    fontFamily: "'Exo', sans-serif",
  },
  image: {
    height: 25,
    width: 25,
  },
  first: {
    width: 5,
    height: 5,
  },
  middle: {
    width: 5,
    height: 5,
  },
  last: {
    width: 5,
    height: 5,
  },
  valueCoin: {
    fontFamily: "'Exo', sans-serif",
    maxWidth: 50,
    height: 10,
    border: "0",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  amountCoin: {
    fontFamily: "'Exo', sans-serif",
    maxWidth: 50,
    height: 10,
    border: "0",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  notesButton: {
    backgroundColor: "#3f51b5",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    marginTop: 20,
    justifyContent: "center",
  },
  loadingStill: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  name: {
    fontFamily: "'Exo', sans-serif",
    fontSize: 13,
    width: 170,
    height: 50,
    borderColor: "white",
  },
  accountBalance: {
    visibility: "hidden",
  },
  buySellDeleteBtn: {
    marginTop: 10,
    // backgroundColor: "#3f51b5",
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    display: "flex",
    width: "375px",
    justifyContent: "space-around",
  },
  name2: {
    fontFamily: "'Exo', sans-serif",
    fontSize: 20,
    fontWeight: 25,
  },
}));

function CoinDetailsPage({ coins }) {
  const classes = useStyles();
  // We need to bring the store in.
  const profileData = useSelector((store) => store.profileData);
  const user = useSelector((store) => store.user);
  const coinInfoReducer = useSelector((store) => store.coinInfoReducer);
  const coinNotes = useSelector((store) => store.coinNotes);
  const marketChartDataReducer = useSelector(
    (store) => store.marketChartDataReducer
  );
  const marketChartStatus = useSelector((store) => store.marketChartStatus);
  const currentUserLocationReducer = useSelector(
    (store) => store.currentUserLocationReducer
  );

  const errorMessageReducer = useSelector((store) => store.errorMessageReducer);
  // Bring Location in
  const location = useLocation();

  // State Holding Area
  const [loadingData, setLoadingData] = useState(false);

  // Bring in params
  const params = useParams();

  // Bring in dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_COIN_INFO3",
      payload: { id: user.id, crypto_name: params.id },
    });
  }, []);

  useEffect(() => {
    dispatch({ type: "FETCH_MARKET_CHART_DATA", payload: params.id });
  }, []);

  useEffect(() => {
    // Dispatch Location reducer current location
    dispatch({ type: "CURRENT_USER_LOCATION", payload: location.pathname });
  }, []);

  return (
    <>
      {!profileData.length === 0 ? (
        <Redirect to="/createProfile" />
      ) : (
        <>
          {coinInfoReducer[0] == undefined ||
          user.id == undefined ||
          marketChartDataReducer[0] == undefined ? (
            <CircularProgress className={classes.loadingStill} />
          ) : (
            <>
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
                </div>
              </div>

              {coinInfoReducer[0][0]?.no_stock ? (
                <>
                  <Grid>
                    <Typography className={classes.name2}>{params.id.toUpperCase()}</Typography>
                    <Typography className={classes.name2}>
                      {coinInfoReducer[0][0]?.no_stock.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </Typography>
                  </Grid>
                </>
              ) : !coinInfoReducer[0][1]?.current_price_of_coin ? (
                <CircularProgress className={classes.loadingStill} />
              ) : (
                <PriceOfCoin
                  classes={classes}
                  coinName={params.id}
                  coinInfoReducer={coinInfoReducer}
                />
              )}

              {marketChartDataReducer[0] == undefined ? (
                <CircularProgress className={classes.loadingStill} />
              ) : (
                <div className="chart-js-dynamic">
                  <ChartData
                    classes={classes}
                    coinName={params.id}
                    marketChartDataReducer={marketChartDataReducer}
                    marketChartStatus={marketChartStatus}
                    CircularProgress={CircularProgress}
                  />
                </div>
              )}

              <div className="button-options-coin-page-details">
                <CoinPageButtonOptions
                  Button={Button}
                  classes={classes}
                  coinInfoReducer={coinInfoReducer}
                  coins={coins}
                  errorMessageReducer={coins}
                />
              </div>

              <div className="coin-details-container-1-2">
                <CoinDetailsCard
                  classes={classes}
                  coinInfoReducer={coinInfoReducer}
                  coinName={params.id}
                />
              </div>

              {coinInfoReducer[0][0]?.id === undefined && !coinNotes[0] ? (
                ""
              ) : (
                <>
                  {/* <CircularProgress className={classes.loadingStill} /> */}
                  <div className="notes-container">
                    <NotesFromServer
                      classes={classes}
                      coinInfoReducer={coinInfoReducer}
                    />
                  </div>

                  <div className="notes-from-server">
                    {coinNotes?.map((notes, index) => {
                      return (
                        <CoinPageNotes
                          coinInfoReducer={coinInfoReducer}
                          key={index}
                          index={index}
                          notes={notes}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default CoinDetailsPage;
