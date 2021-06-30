const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const axios = require("axios");

router.get("/UpdatedAmount/:name/:id", rejectUnauthenticated, (req, res) => {
  console.log(`Got to get coin page`);
  console.log(`Req Params`, req.params);
  const queryText = `
    SELECT * FROM coin_page
    WHERE user_profile_id=$1 and crypto_name=$2;
    `;
  const nameUpper = req.params.name.toUpperCase();
  console.log(nameUpper);
  let amount_owned = 0;
  let name = "";
  let coin_current_market_price = 0;
  if (req.isAuthenticated) {
    pool
      .query(queryText, [Number(req.params.id), nameUpper])
      .then((results) => {
        // Set amount_owned and name from server to our variable
        amount_owned = Number(results.rows[0].amount_owned);
        name = results.rows[0].crypto_name.toLowerCase();
        console.log(name);
        // Need axios to go to coingecko and fetch coin data
        axios
          .get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${name}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
          )
          .then((response) => {
            // Set the current price of the coin to our variable
            coin_current_market_price = Number(response.data[0].current_price);
            // coins current price * users amount owned
            let valueOfAmountOwned = coin_current_market_price * amount_owned;
            // Send back our Overall value
            res.send([valueOfAmountOwned]);
          })
          .catch((error) => {
            console.log(`Ohh No, coingecko failed me! ${error}`);
            res.sendStatus(500);
          });
      })
      .catch((error) => {
        if (error.TypeError === undefined) {
          console.log("hello");
        } else {
          console.log(
            `Hey Capt. We had a GET coin page error.`,
            error.TypeError
          );
          res.sendStatus(500);
        }
      });
  } else {
    // FORBIDDEN
    res.sendStatus(403);
  }
});

module.exports = router;
