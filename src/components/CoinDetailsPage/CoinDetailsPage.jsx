import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./CoinDetailsPageCSS/CoinDetailsPage.css";
import axios from "axios";

// Components import Area
import BuyCoinButton from "./CoinDetailsPageComponents/BuyCoinButton";
import BuyMoreCoinsButton from "./CoinDetailsPageComponents/BuyMoreCoinsButton";
import ChartData from "../ChartData/ChartData";
import CoinCardDetails from "./CoinDetailsPageComponents/CoinCardDetails";
import CoinPageNotes from "./CoinDetailsPageComponents/CoinPageNotes";
import DeleteCoinButton from "./CoinDetailsPageComponents/DeleteCoinButton";
import NavDrawer from "../NavDrawer/NavDrawer";
import NotesFromServer from "./CoinDetailsPageComponents/NotesFromServer";
import SellCoinButton from "./CoinDetailsPageComponents/SellCoinButton";

// Material-ui Imports
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// const useStyles = makeStyles((theme) => ({
//   loadingStill: {
//     display: "flex",
//     "& > * + *": {
//       marginLeft: theme.spacing(2),
//     },
//   },
// }));

const useStyles = makeStyles((theme) => ({
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
  table: {
    minWidth: 380,
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
    paddingLeft: 200,
    border: 0,
  },
  amountCoin: {
    paddingLeft: 200,
    border: 0,
  },
  notesButton: {
    background: "linear-gradient(45deg, #FF8E53 30%, #003366 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 40,
    width: 100,
    padding: "0 30px",
    marginTop: 20,
  },
  loadingStill: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function CoinDetailsPage({ coins }) {
  const classes = useStyles();
  // const classes = useStyles2();
  // We need to bring the store in.
  const profileData = useSelector((store) => store.profileData);
  const user = useSelector((store) => store.user);
  const coinInfoReducer = useSelector((store) => store.coinInfoReducer);
  const coinNotes = useSelector((store) => store.coinNotes);
  const marketChartDataReducer = useSelector(
    (store) => store.marketChartDataReducer
  );
  const marketChartStatus = useSelector((store) => store.marketChartStatus);
  // console.log(`marketChartDataReducer => `, marketChartDataReducer)

  const currentUserLocationReducer = useSelector(
    (store) => store.currentUserLocationReducer
  );

  const errorMessageReducer = useSelector((store) => store.errorMessageReducer);
  // Bring Location in
  const location = useLocation();

  // State Holding Area
  // Set our coin info from coingecko api
  const [coinsFromGecko, setCoinsFromGecko] = useState([]);
  const [amountUndefined, setAmountUndefined] = useState(false);
  const [amountOwned, setAmountOwned] = useState(
    coinInfoReducer[0]?.amount_owned?.crypto_name
  );
  const [loadingData, setLoadingData] = useState(false);
  const [chartData, setChartData] = useState({});

  // Bring in params
  const params = useParams();

  // Bring in useHistory
  const history = useHistory();
  // Bring in dispatch
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${params.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        )
        .then(async (response) => {
          setCoinsFromGecko(response.data);
          setAmountUndefined(true);
          dispatch({
            type: "FETCH_MARKET_CHART_DATA",
            payload: params.id,
          });
          dispatch({
            type: "FETCH_COIN_INFO2",
            payload: { id: user.id, crypto_name: params.id },
          });
        })
        // .then(() => {
        //   setChartData({
        //     labels: [
        //       "23h",
        //       "22h",
        //       "21h",
        //       "20h",
        //       "19h",
        //       "18h",
        //       "17h",
        //       "16h",
        //       "15h",
        //       "14h",
        //       "13h",
        //       "12h",
        //       "11h",
        //       "10h",
        //       "9h",
        //       "8h",
        //       "7h",
        //       "6h",
        //       "5h",
        //       "4h",
        //       "3h",
        //       "2h",
        //       "1h",
        //       "Now",
        //     ],
        //     datasets: [
        //       {
        //         label: `${params.id}`,
        //         data: [
        //           marketChartDataReducer[0],
        //           marketChartDataReducer[1],
        //           marketChartDataReducer[2],
        //           marketChartDataReducer[3],

        //           marketChartDataReducer[4],
        //           marketChartDataReducer[5],
        //           marketChartDataReducer[6],
        //           marketChartDataReducer[7],

        //           marketChartDataReducer[8],
        //           marketChartDataReducer[9],
        //           marketChartDataReducer[10],
        //           marketChartDataReducer[11],

        //           marketChartDataReducer[12],
        //           marketChartDataReducer[13],
        //           marketChartDataReducer[14],
        //           marketChartDataReducer[15],

        //           marketChartDataReducer[16],
        //           marketChartDataReducer[17],
        //           marketChartDataReducer[18],
        //           marketChartDataReducer[19],

        //           marketChartDataReducer[20],
        //           marketChartDataReducer[21],
        //           marketChartDataReducer[22],
        //           coinsFromGecko[0]?.current_price,
        //         ],
        //         backgroundColor: [`rgba(75, 192, 192, 0.6)`],
        //       },
        //     ],
        //   });
        // })
        .catch((error) => {
          console.log(`Ohh No, coingecko failed me! ${error}`);
        });
      // await marketChartDataReducer;
    } catch (error) {
      console.log(`Error`);
    } finally {
      setLoadingData(!loadingData);
      console.log("marketChartDataReducer =>", marketChartDataReducer);
    }
  }, []);

  // const handleErrorMessage =
  //   setTimeout(() => {
  //     // <div>
  //     //   <p>{errorMessageReducer.message}</p>
  //     // </div>;
  //     dispatch({ type: "RESET_ERROR_COIN_MESSAGE" });
  //   }, 3000);

  const handleAsyncIssues = () => {
    if (coinInfoReducer.value_of_amount_owned == undefined) {
      // console.log(`It was undefined`);
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
  }, [chartData]);

  if (!marketChartStatus && !marketChartDataReducer) {
    return "Loading...";
  } else {
    return (
      <>
        {!profileData.length ? (
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

              <div  className="account-balance-container">
                {/* Name of coin and current price on page load. */}
                <h3>{coinsFromGecko[0]?.name}</h3>
                <p>
                  {coinsFromGecko[0]?.current_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>

              {/* {!chartData ? (
                <>
                  <p>Loading...</p>
                </>
              ) : (
                <div>
                  <ChartData
                    // currentPrice={coinsFromGecko}
                    coinName={params.id}
                    // marketChartDataReducer={marketChartDataReducer}
                    // loadingData={loadingData}
                    coinPrice={coinsFromGecko[0]?.current_price}
                    chartData={chartData}
                    marketChartStatus={marketChartStatus}
                  />
                </div>
              )} */}

              {/* If the User doesn't own any coins, disable user coin section */}
              <div className="buy-sell-delete-options-container">
                <>
                  {!amountOwned ? (
                    <BuyCoinButton
                      useStyles={useStyles}
                      Button={Button}
                      coinsFromGecko={coinsFromGecko}
                    />
                  ) : (
                    <>
                      {/* User Coin Section */}
                      <BuyMoreCoinsButton
                        Button={Button}
                        useStyles={useStyles}
                      />
                      <SellCoinButton useStyles={useStyles} Button={Button} />
                      <DeleteCoinButton
                        coins={coins}
                        useStyles={useStyles}
                        Button={Button}
                      />
                    </>
                  )}
                  {errorMessageReducer.message ? (
                    <>
                      <div>
                        {/* {handleErrorMessage} */}
                        <p>{errorMessageReducer.message}</p>
                      </div>
                      {/* <div>
                      <p>{errorMessageReducer.message}</p>
                    </div> */}
                    </>
                  ) : (
                    ""
                  )}
                </>
              </div>

              {coinInfoReducer &&
              coinInfoReducer.amount_owned &&
              !errorMessageReducer.message ? (
                <>
                  {!coinInfoReducer.value_of_amount_owned &&
                  !coinInfoReducer.amount_owned[0].amount_owned ? (
                    <CircularProgress className={classes.loadingStill}/>
                  ) : (
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableBody>
                          <TableRow>
                            <TableCell>{coinsFromGecko[0]?.name}</TableCell>
                            <div className="value-amount-owned-container">
                              <TableCell className={classes.valueCoin}>
                                {coinInfoReducer?.value_of_amount_owned?.toLocaleString(
                                  "en-US",
                                  {
                                    style: "currency",
                                    currency: "USD",
                                  }
                                )}
                              </TableCell>
                              <TableCell className={classes.amountCoin}>
                                {coinInfoReducer?.amount_owned[0]?.amount_owned?.toLocaleString(
                                  {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 8,
                                  }
                                )}
                              </TableCell>
                            </div>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </>
              ) : (
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell>{coinsFromGecko[0]?.name}</TableCell>
                        <div className="value-amount-owned-container">
                          <TableCell>{<div>$0.00</div>}</TableCell>
                          <TableCell>{<div>0</div>}</TableCell>
                        </div>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {/* If user doesn't own any coins, don't display Notes section */}
              {!amountOwned ? (
                <p></p>
              ) : (
                <>
                  <div className="notes-container">
                    <NotesFromServer useStyles={useStyles} />
                  </div>

                  <div className="notes-from-server">
                    {coinNotes?.map((notes, index) => {
                      return (
                        <CoinPageNotes
                          key={index}
                          index={index}
                          notes={notes}
                        />
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
}

export default CoinDetailsPage;
