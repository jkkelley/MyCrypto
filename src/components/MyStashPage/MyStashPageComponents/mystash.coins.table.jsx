import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect, useLocation } from "react-router-dom";
import axios from "axios";

// Material-ui imports
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import createSpacing from "@material-ui/core/styles/createSpacing";
import { CenterFocusStrong } from "@material-ui/icons";

const useStyles = makeStyles({
  table: {
    minWidth: 350,
    alignItems: "center",
  },
  image: {
    maxHeight: 25,
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
  name: {
    fontFamily: "'Exo', sans-serif",
    paddingRight: 30,
    fontSize: 12,
    width: 90,
    height: 50,
  },
  coinImage: {
    width: 50,
    height: 50,
  },
  fontsForTable: {
    fontFamily: "'Exo', sans-serif",
  }
});

function MyStashCoinsTable({ coins }) {
  // Bring in dispatch
  const dispatch = useDispatch();
  // Bring history in
  const history = useHistory();
  // Custom CSS
  const classes = useStyles();
  // Local State Area
  const [currentCoinPrice, setCurrentCoinPrice] = useState([]);
  // Coin name lower
  const nameLower = coins?.crypto_name?.toLowerCase();
  let valueOfCoin = 0;

  // Function to handle clicking a coin
  const handleCoinClick = () => {
    history.push(`/coinDetails/${nameLower}`);
  };

  useEffect(async () => {
    // Grab coin info from coingecko api
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${nameLower}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then(async (response) => {
        // current_price * amount_owned
        valueOfCoin =
          (await Number(coins.amount_owned)) *
          Number(response?.data[0]?.current_price);
        await setCurrentCoinPrice(valueOfCoin);
        try {
          await dispatch({
            type: "MY_STASH_VALUE",
            payload: parseFloat(valueOfCoin),
          });
        } catch (error) {
          console.log(`We caught an error Boss, mystash.coins.table`, error);
        }
      })
      .catch((error) => {
        console.log(`Ohh No, coingecko failed me! ${error}`);
        alert(`We've had problem, sorry`);
      });
  }, []);

  return (
    <>
      {/* If user has no amount of a coin, show nothing. */}
      {!parseFloat(coins.amount_owned) == 0 ? (
        <div className="coin-container" onClick={handleCoinClick}>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell className={classes.coinImage} align="left">
                    <img src={coins?.coin_image} />
                  </TableCell>
                  <TableCell align="left" className={classes.name} >
                    {coins?.coin_symbol.toUpperCase()}
                  </TableCell>

                  <TableCell align="left" className={classes.fontsForTable}>
                    <>
                      {currentCoinPrice?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </>
                  </TableCell>
                  <TableCell align="right" className={classes.fontsForTable}>
                    {(coins?.amount_owned).toLocaleString({
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 8,
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default MyStashCoinsTable;
