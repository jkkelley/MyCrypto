import "./CoinMarket.css";

import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
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
    alignItems: "center",
    boxShadow: "0 1px 2px 1px #3f51b5",
    marginBottom: {
      "&:last-child": {
        marginBottom: "20px",
      },
    },
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
  coinName: {
    fontFamily: "'Exo', sans-serif",
    justifyContent: "flex-start",
    fontSize: 15,
    paddingLeft: 20,
  },
  coinImage: {
    width: 55,
    height: 50,
  },
});

function CoinMarket2({ coins, name, price }) {
  // Bring in dispatch
  const dispatch = useDispatch();
  // Bring history in
  const history = useHistory();
  // Custom CSS classes
  const classes = useStyles();
  const user = useSelector((store) => store.user);

  // Function to handle going to /coinDetails/:id
  const handleCoinClick = (coins) => {
    console.log(`You clicked handleCoinClick.`);
    console.log(coins);
    // dispatch({
    //   type: "CLEAR_COIN_INFO",
    //   type: "CLEAR_FORM_SUBMISSION",
    //   type: "COIN_CLICK_INFO_PAGE_2",
    //   payload: coins,
    // });
    // dispatch({
    //   type: "FETCH_COIN_INFO3",
    //   payload: { crypto_name: coins.id, id: user.id },
    // });
    history.push(`/coinDetails/${coins.id}`);
  };
  return (
    <>
      <div className="coin-container">
        <div className="coin" onClick={() => handleCoinClick(coins)}>
          <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell className={classes.coinImage}>
                    <img src={coins.image} />
                  </TableCell>
                  <TableCell
                    justifyContent="flex-start"
                    className={classes.coinName}
                    align="left"
                  >
                    {name}
                  </TableCell>
                  <TableCell align="right" className={classes.coinName}>
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
