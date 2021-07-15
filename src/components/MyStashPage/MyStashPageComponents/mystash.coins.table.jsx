import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

// Material-ui imports
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    minWidth: 350,
    alignItems: "center",
    boxShadow: "0 1px 2px 1px #3f51b5",
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
  },
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
  // Coin name lower to hit our coingecko api endpoint.
  const nameLower = coins?.crypto_name?.toLowerCase();
  // Set our value of coin to 0 until coingecko comes back with a price for us.
  let valueOfCoin = 0;

  // Function to handle clicking a coin
  const handleCoinClick = () => {
    history.push(`/coinDetails/${nameLower}`);
  };


  useEffect(async () => {
    try {
      // Ask coingecko for a some info, Promise you'll come back
      const coinGeckoApiFetch = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${nameLower}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );

      // Set our value of the coin based 
      valueOfCoin =
        parseFloat(coins.amount_owned) *
        parseFloat(coinGeckoApiFetch?.data[0]?.current_price);
      setCurrentCoinPrice(valueOfCoin);
      
      // Tell dispatch we got a payload coming in...
      dispatch({
        type: "MY_STASH_VALUE",
        payload: parseFloat(valueOfCoin),
      });
    } catch (error) {
      console.log(`Sorry we problem with coingecko api or ...`, error);
    }
  }, []);

  return (
    <>
      {/* If user has no amount of a coin, show nothing. */}
      {!parseFloat(coins.amount_owned) == 0 ? (
        <div className="coin-container" onClick={handleCoinClick}>
          <div className="coin-table-container">
            <TableContainer className={classes.table}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.coinImage} align="left">
                      <img src={coins?.coin_image} />
                    </TableCell>
                    <TableCell align="left" className={classes.name}>
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
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default MyStashCoinsTable;
