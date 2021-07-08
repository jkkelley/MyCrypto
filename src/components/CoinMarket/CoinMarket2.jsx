import "./CreateProfilePage.css";

import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
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

function CoinMarket2({ coins, name, price }) {
  // Bring in dispatch
  const dispatch = useDispatch();
  // Bring history in
  const history = useHistory();
  // Custom CSS classes
  const classes = useStyles();
  // Function to handle going to /coinDetails/:id
  const handleCoinClick = (coins) => {
    console.log(`You clicked handleCoinClick.`);
    console.log(coins);
    dispatch({
      type: "CLEAR_COIN_INFO",
      type: "CLEAR_FORM_SUBMISSION",
      type: "COIN_CLICK_INFO_PAGE_2",
      payload: coins,
    });
    history.push(`/coinDetails/${coins.id}`);
  };
  return (
    <>
      <div className="coin-container">
        <div className="coin" onClick={() => handleCoinClick(coins)}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              {/* <TableHead>
                <TableRow>
                  <TableCell className={classes.first}></TableCell>
                  <TableCell className={classes.middle}></TableCell>
                  <TableCell className={classes.last}></TableCell>
                </TableRow>
              </TableHead> */}

              <TableBody>
                <TableRow>
                  <TableCell>
                    <img
                      className={classes.image}
                      src={coins.image}
                      height="25px"
                    ></img>
                  </TableCell>
                  <TableCell align="left">{name}</TableCell>
                  <TableCell align="right">
                    {price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default CoinMarket2;
