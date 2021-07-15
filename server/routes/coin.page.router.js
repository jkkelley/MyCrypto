const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const axios = require("axios");


router.put(
  "/sellCoin/v2/:name/:id",
  rejectUnauthenticated,
  async (req, res) => {
    const client = await pool.connect();
    console.log(
      `You trying to sell? /api/CoinPage/sellCoin/v2/${req.params.crypto_name}/${req.params.id}`,
      req.params
    );
    console.log(`What data did we bring? => `, req.body);

    // Users account balance from table user_profile
    let account_balance = 0;
    // Users coin amount_owned from table coin_page
    let amount_owned = 0;
    // User coin amount trying to sell
    let amount_to_sell = Number(req.body.amount);
    // Current Market Price for coin
    let coin_current_market_price = 0;
    // Amount to update table user_profile account_balance
    let account_balance_update = 0;
    // All Coins in database are Uppercase
    const nameUpper = req.params.name.toUpperCase();

    const queryToSellCoin = `
    UPDATE coin_page SET amount_owned=amount_owned-$1 
    WHERE user_profile_id=$2 and crypto_name=$3;
    `;
    const queryGetText = `
    SELECT * FROM user_profile
    WHERE users_id=$1;
    `;
    const queryGetCoinPageText = `
    SELECT * FROM coin_page
    WHERE user_profile_id=$1 and crypto_name=$2;
    `;

    const queryUpdateAccountBalance = `
    UPDATE user_profile SET account_balance=account_balance+$1
    WHERE users_id=$2;
    `;

    // Do you belong in this REALM?
    if (req.isAuthenticated) {
      try {
        await client.query("BEGIN");
        const coin_page_response = await pool.query(queryGetCoinPageText, [
          Number(req.params.id),
          nameUpper,
        ]);
        console.log(
          `coin_page_response => `,
          coin_page_response.rows[0].amount_owned
        );
        amount_owned = Number(coin_page_response.rows[0].amount_owned);
        console.log(
          `Can you sell this coin =>`,
          amount_to_sell <= amount_owned
        );
        if (amount_to_sell <= amount_owned) {
          const coinGeckoApiCall = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${req.params.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
          );
          coin_current_market_price = Number(
            coinGeckoApiCall.data[0].current_price
          );
          // Need account balance from user_profile table
          console.log(
            `coin_current_market_price => `,
            Number(coin_current_market_price)
          );
          const userAccountBalance = await pool.query(queryGetText, [
            Number(req.params.id),
          ]);
          account_balance = Number(userAccountBalance.rows[0]?.account_balance);
          console.log(`account_balance => `, account_balance);
          const subtractAmountCoinPage = await pool.query(queryToSellCoin, [
            amount_to_sell,
            Number(req.params.id),
            nameUpper
          ]);
          console.log(
            `Deposit user_profile account_balance => `,
            coin_current_market_price * amount_to_sell
          );
          account_balance_update = coin_current_market_price * amount_to_sell;
          console.log(
            `account_balance_update => `,
            Number(account_balance_update)
          );
          const updateAccountBalance = await pool.query(queryUpdateAccountBalance, [
            Number(account_balance_update),
            Number(req.params.id),
          ]);
          await client.query("COMMIT");
          // Send back an OK
          res.sendStatus(200);
        } else {
          res.send([-1]);
        }
      } catch (error) {
        console.error(`Can't sell coins right now!`, error);
      } finally {
        client.release()
      }
    } else {
      // Sorry, gotta give yah the boot,
      // no messing around in here!
      res.sendStatus(403);
    }
  }
);

router.put("/v1/buyMoreCoins/", rejectUnauthenticated, async (req, res) => {
  const client = await pool.connect();
  console.log(`/v1/buyMoreCoins/ =>`, req.body);
  const nameLower = req.body.crypto_name.toLowerCase();
  const nameUpper = req.body.crypto_name.toUpperCase();

  // Users Account balance
  let account_balance = 0;
  // Current Market Price of Coin
  let coin_current_market_price = 0;
  let purchasedPriceAmount = 0;
  const queryGetText = `
  SELECT * FROM user_profile
  WHERE users_id=$1;
  `;
  const queryPutText = `
  UPDATE coin_page SET amount_owned=amount_owned+$1 
  WHERE user_profile_id=$2 and crypto_name=$3;
  `;
  const queryUpdateText = `
  UPDATE user_profile SET account_balance=account_balance-$1 WHERE users_id=$2;
  `;

  if (req.isAuthenticated) {
    try {
      // Let's gather some data
      await client.query("BEGIN");
      const coingeckoResponse = await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${nameLower}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        )
        .then((result) => {
          coin_current_market_price = Number(result.data[0].current_price);
          purchasedPriceAmount = Number(
            coin_current_market_price * req.body.amount
          );
        });

      await console.log(
        `coin_current_market_price => `,
        coin_current_market_price
      );
      await console.log(`purchasedPriceAmount => `, purchasedPriceAmount);
      const userProfileResponse = await pool
        .query(queryGetText, [req.body.id])
        .then((result) => {
          account_balance = Number(result.rows[0].account_balance);
        })
        .then(async () => {
          // Send back a -1 "no" response to be set in coinInfoReducer
          // This will in turn tell the user they don't have the funds
          // to purchase this amount of the coin.
          if (purchasedPriceAmount.toFixed(2) > account_balance) {
            res.send([-1]);
          } else {
            // Subtract purchase price from user_profile account_balance
            const updatedCoinAmount = await pool.query(queryPutText, [
              req.body.amount,
              req.body.id,
              nameUpper,
            ]);
            const updatedUserProfileAccountBalance = await pool.query(
              queryUpdateText,
              [purchasedPriceAmount, req.body.id]
            );
            await client.query("COMMIT");
            res.sendStatus(201);
          }
        });
    } catch (error) {
      console.log(`Sorry we a problem updating coin PUT route`, error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  } else {
    // Forbidden
    res.sendStatus(403);
  }
});

router.delete("/v1/:name/:id", rejectUnauthenticated, async (req, res) => {
  const client = await pool.connect();
  console.log(
    `Welcome to /api/CoinPage/v1/${req.params.name}/${req.params.id} =>`,
    req.params
  );
  const nameUpper = req.params.name.toUpperCase();

  // Query Area
  const queryCoinPageText = `
  SELECT * FROM coin_page
  WHERE user_profile_id=$1 and crypto_name=$2;
  `;

  const queryUpdateAccountBalance = `
  UPDATE user_profile SET account_balance=account_balance+$1 WHERE users_id=$2;
  `;

  const queryToDeleteCoin = `
  DELETE FROM coin_page
  WHERE user_profile_id=$1 and crypto_name=$2;
  `;
  // Current Market Price for coin
  let coin_current_market_price = 0;
  let account_balance_increase = 0;
  if (req.isAuthenticated) {
    try {
      // Let's gather some data
      await client.query("BEGIN");
      const coingeckoResponse = await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${req.params.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        )
        .then((result) => {
          coin_current_market_price = Number(result.data[0].current_price);
        });

      await console.log(
        `coin_current_market_price => `,
        coin_current_market_price
      );
      const getCoinPageResponse = await pool
        .query(queryCoinPageText, [Number(req.params.id), nameUpper])
        .then((result) => {
          account_balance_increase =
            Number(result.rows[0].amount_owned) * coin_current_market_price;
        });
      await console.log(
        `account_balance_increase => `,
        account_balance_increase
      );
      // Increase user_profile account_balance
      await pool.query(queryUpdateAccountBalance, [
        account_balance_increase,
        Number(req.params.id),
      ]);
      await pool.query(queryToDeleteCoin, [Number(req.params.id), nameUpper]);
      await client.query("COMMIT");
      res.sendStatus(201);
    } catch (error) {
      console.log(`We have a problem DELETING your coin`, error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  } else {
    // Forbidden
    res.sendStatus(403);
  }
});

router.post("/Buy2/:name/:id", rejectUnauthenticated, async (req, res) => {
  console.log(`Got to /api/CoinPage/Buy2`);
  const nameUpper = req.body.crypto_name.toUpperCase();
  // console.log(req.params.name);
  let coin_current_market_price = 0;
  let account_balance = 0;
  let coin_symbol = "";
  let coin_image = "";
  const client = await pool.connect();

  const queryPostText = `
  INSERT INTO coin_page 
    (crypto_name, amount_owned, price_purchased_at, user_profile_id, coin_symbol, coin_image)
  VALUES
    ($1, $2, $3, $4, $5, $6);
  `;
  const queryGetText = `
  SELECT * FROM user_profile
  WHERE users_id=$1;
  `;

  const queryUpdateText = `
  UPDATE user_profile SET account_balance=account_balance-$1 WHERE users_id=$2;
  `;

  if (req.isAuthenticated) {
    try {
      await client.query("BEGIN");
      const responseAPI = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${req.params.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      coin_current_market_price = Number(responseAPI.data[0].current_price);
      coin_symbol = responseAPI.data[0].symbol;
      coin_image = responseAPI.data[0].image;
      console.log(`responseAPI.data.current_price`, coin_current_market_price);
      const responseUserProfile = await pool.query(queryGetText, [req.body.id]);
      console.log(`responseUserProfile`, responseUserProfile.rows);
      // Users Account Balance
      account_balance = Number(responseUserProfile.rows[0].account_balance);
      console.log(`Users Account balance =>`, account_balance);
      // Amount user will be spending
      let purchasePriceAmount =
        Number(req.body.amount) * Number(coin_current_market_price);
      console.log(`amount you'll spend => `, purchasePriceAmount.toFixed(2));
      console.log(
        `Can you buy this coin => `,
        Number(account_balance) > purchasePriceAmount.toFixed(2)
      );

      // Send back a -1 "no" response to be set in coinInfoReducer
      // This will in turn tell the user they don't have the funds
      // to purchase this amount of the coin.
      if (purchasePriceAmount.toFixed(2) > account_balance) {
        await client.query("COMMIT");
        res.send([-1]);
      } else {
        // The query we send Subtracts purchasePriceAmount
        // from table user_profile, column account_balance.
        const responseUserProfileBalance = await pool.query(queryUpdateText, [
          Number(purchasePriceAmount).toFixed(2),
          req.body.id,
        ]);
        const responseCoinPage = await pool.query(queryPostText, [
          nameUpper,
          Number(req.body.amount),
          Number(coin_current_market_price),
          Number(req.body.id),
          coin_symbol,
          coin_image,
        ]);
      }
      await client.query("COMMIT");
      res.sendStatus(201);
    } catch (error) {
      console.log(`We couldn't buy you're coins for you`, error);
      res.sendStatus(500);
    } finally {
      console.log(`We're done buying this coin!`);
      client.release();
    }
  } else {
    // Forbidden
    res.sendStatus(403);
  }
});

router.get(
  "/coinPageCoinInfo/v2/:name/:id",
  rejectUnauthenticated,
  async (req, res) => {
    console.log(
      `/coinPageCoinInfo/v2/${req.params.name}/${req.params.id} =>`,
      req.params
    );
    const client = await pool.connect();
    // Database name stored Upper
    const nameUpper = req.params.name.toUpperCase();
    // Variables to hold current price of coin from api and
    // amount owned from coin_page database table
    let coin_current_market_price = 0;
    let amount_owned = 0;
    // Value of coin coin_current_market_price * amount_owned
    let current_value_of_coins_held = 0;
    // Query Area for DB
    const getCoinInfoText = `
    SELECT * FROM coin_page
    WHERE user_profile_id=$1 and crypto_name=$2;
    `;

    if (req.isAuthenticated) {
      try {
        await client.query("BEGIN");
        const coinGeckoApiReturn = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${req.params.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );
        coin_current_market_price = Number(
          coinGeckoApiReturn.data[0].current_price
        );
        console.log(`coin_current_market_price => `, coin_current_market_price);

        const coinPageResponse = await pool.query(getCoinInfoText, [
          Number(req.params.id),
          nameUpper,
        ]);

        await client.query("COMMIT");
        if (coinPageResponse.rows[0] === undefined) {
          res.send([{ no_stock: coin_current_market_price }]);
        } else {
          console.log(`coinPageResponse => `, coinPageResponse.rows);
          amount_owned = Number(coinPageResponse.rows[0].amount_owned);
          console.log(`amount_owned => `, amount_owned);
          current_value_of_coins_held =
            coin_current_market_price * amount_owned;
          console.log(
            `current_value_of_coins_held => `,
            current_value_of_coins_held
          );
          res.send([
            coinPageResponse.rows[0],
            {
              valueOfCurrentCoin: current_value_of_coins_held,
              current_price_of_coin: coin_current_market_price,
            },
          ]);
        }
      } catch (error) {
        console.log(
          `Sorry we couldn't get your /coinPageCoinInfo/v2/${req.params.name}/${req.params.id} info`,
          error
        );
      } finally {
        client.release();
      }
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }
);

module.exports = router;

