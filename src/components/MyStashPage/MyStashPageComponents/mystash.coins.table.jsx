import React, { useEffect, useState } from "react";
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

const useStyles = makeStyles({
  table: {
    minWidth: 350,
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
});

function MyStashCoinsTable({ coins }) {
  const classes = useStyles();
  // Local State Area
  const [currentCoinApi, setCurrentCoinApi] = useState([]);
  const [currentCoinPrice, setCurrentCoinPrice] = useState([]);
  let nameLower = coins.crypto_name.toLowerCase();
  let valueOfCoin = 0;

  useEffect(async () => {
    // Grab coin info from coingecko api
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${nameLower}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then(async (response) => {

        // Set our coin data to local state
        await setCurrentCoinApi(response.data);

        valueOfCoin =
          (await Number(coins.amount_owned)) *
          Number(response?.data[0]?.current_price);

        await setCurrentCoinPrice(valueOfCoin);
      })
      .catch((error) => {
        console.log(`Ohh No, coingecko failed me! ${error}`);
        alert(`We've had problem, sorry`);
      });
  }, []);

  return (
    <>
      <div className="coin-container">
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <img src={coins?.coin_image} width="25px"></img>
                </TableCell>
                <TableCell>
                  <p>{coins?.crypto_name}</p>
                </TableCell>
                <TableCell>
                  <p>
                    {currentCoinPrice?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </TableCell>
                <TableCell>
                  <p>
                    {(coins?.amount_owned).toLocaleString({
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 8,
                    })}
                  </p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default MyStashCoinsTable;

