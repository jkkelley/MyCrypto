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


router.get("/coinPageCoinInfo/:name/:id", rejectUnauthenticated, (req, res) => {
  console.log(`You got to /api/CoinPage/coinPageCoinInfo`)
  const nameUpper = req.params.name.toUpperCase();
  const getCoinInfoText = `
  SELECT * FROM coin_page
  WHERE user_profile_id=$1 and crypto_name=$2;
  `
  if (req.isAuthenticated) {
    pool
      .query(getCoinInfoText, [Number(req.params.id), nameUpper]).then(results => {
        console.log(results.rows)
        res.send(results.rows)
      }).catch(error => {
        console.log(`Sorry we couldn't get your coin info ${error}`)
        res.sendStatus(500)
      })
  } else {
    // FORBIDDEN
    res.sendStatus(403);
  }

})
// POST Area

router.post("/Buy/:name/:id", rejectUnauthenticated, (req, res) => {
  console.log(`Got to /api/CoinPage/Buy`);
  console.log(req.params);
  console.log(req.body);
  const nameUpper = req.body.name.toUpperCase();
  console.log(nameUpper);
  let coin_current_market_price = 0;
  let account_balance = 0;

  const queryPostText = `
  INSERT INTO coin_page 
    (crypto_name, amount_owned, price_purchased_at, user_profile_id)
  VALUES
    ($1, $2, $3, $4);
  `;
  const queryGetText = `
  SELECT * FROM user_profile
  WHERE users_id=$1;
  `;

  const queryUpdateText = `
  UPDATE user_profile SET account_balance=account_balance-$1 WHERE users_id=$2;
  `;

  if (req.isAuthenticated) {
    // You passed the checked
    try {
      // axios, go to coingecko and get me the coins info
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${req.body.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        )
        .then((response) => {
          // Set the current price of the coin to our variable
          coin_current_market_price = Number(response.data[0].current_price);
          try {
            // We need some info from table user_profile
            pool
              .query(queryGetText, [req.body.id])
              .then((response) => {
                console.log(response.rows);
                // Users Account Balance
                account_balance = Number(response.rows[0].account_balance);
                console.log(account_balance);
                // Amount user will be spending
                let purchasePriceAmount =
                  req.body.amount * coin_current_market_price;
                console.log(`amount you'll spend => `, purchasePriceAmount.toFixed(2));
                console.log(
                  `Can you buy this coin => `,
                  account_balance > purchasePriceAmount.toFixed(2)
                );
                // Send back a -1 "no" response to be set in coinInfoReducer
                // This will in turn tell the user they don't have the funds
                // to purchase this amount of the coin.
                if (purchasePriceAmount.toFixed(2) > account_balance) {
                  res.send([-1]);
                } else {
                  // The query we send Subtracts purchasePriceAmount
                  // from table user_profile, column account_balance.
                  pool
                    .query(queryUpdateText, [Number(purchasePriceAmount).toFixed(2), req.body.id])
                    .then((response) => {
                      // console.log(response.data)
                      try {
                        pool
                          .query(queryPostText, [
                            nameUpper,
                            req.body.amount,
                            coin_current_market_price,
                            req.body.id,
                          ])
                          .then((response) => {
                            res.send([req.body.amount]);
                          })
                          .catch((error) => {
                            console.log(
                              `Bring the hammer, we got a prob... ${error}`
                            );
                            res.sendStatus(500);
                          });
                      } catch (error) {
                        console.log(
                          `We're really deep, how'd we get here?`,
                          error
                        );
                      }
                    })
                    .catch((error) => {
                      console.log(
                        `We had a problem updating user_profile account_balance`,
                        error
                      );
                    });
                }
              })
              .catch((error) => {
                console.log(
                  `We had an Error getting user_profile from POST promise`,
                  error
                );
                res.sendStatus(500);
              });
          } catch (error) {
            console.log(`had an error`);
          }
        })
        .catch((error) => {
          console.log(`We had a problem fetching Coin Info from coingecko`);
        });
    } catch (error) {
      console.log(`We had a problem`);
    }
  }
});

module.exports = router;
