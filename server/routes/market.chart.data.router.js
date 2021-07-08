const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const { default: axios } = require("axios");

// GET routes
router.get("/v1/:coin", rejectUnauthenticated, async (req, res) => {
  const client = await pool.connect();
  console.log(`You got to /api/marketChart/v1/${req.params.coin}`);
  let marketD = [];
  let finallyRes = [];
  if (req.isAuthenticated) {
    try {
      await client.query("BEGIN");
      const coingeckoMarketChartData = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${req.params.coin}/market_chart?vs_currency=usd&days=2`
      );
      // await console.log(
      //   `48 Hours prices [Date.now(), Price]=>`,
      //   coingeckoMarketChartData.data.prices
      // );
      await console.log(
        `48 Hours prices slice =>`,
        coingeckoMarketChartData.data.prices.slice(25, -1)
      );
      // Hour in ms: price
      marketD = await coingeckoMarketChartData.data.prices.slice(25, -1);
      
      // Cut time out
      for (let i = 0; i < marketD.length; i++) {
        let data = marketD[i].slice(1);

        finallyRes.push(data);
      }
      await console.log(`finallyRes =>`, finallyRes);
      // await console.log(data101);
      await client.query("COMMIT");
      // Send back Prices for coin!
      res.send(finallyRes);
    } catch (error) {
      console.log(`We couldn't get your Chart Data`, error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  } else {
    // Forbidden
    res.sendStatus(403);
  }
});

module.exports = router;
