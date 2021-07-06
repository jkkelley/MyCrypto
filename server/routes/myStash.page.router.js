const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const axios = require("axios");

// GET Area
router.get("/v1/:id", rejectUnauthenticated, async (req, res) => {
  await console.log(
    `We got to myStash /api/myStash/v1/${req.params.id} =>`,
    req.params
  );

  const client = await pool.connect();

  // Query Area
  const queryGetText = `
  SELECT * FROM coin_page
  WHERE user_profile_id=$1;
  `;

  if (req.isAuthenticated) {
    try {
      await client.query("BEGIN");
      const getUsersCoinPageCoins = await pool.query(queryGetText, [
        Number(req.params.id),
      ]);
      await console.log(
        `All users coins from coin_page => `,
        getUsersCoinPageCoins.rows
      );
      await client.query("COMMIT");
      res.sendStatus(201);
    } catch (error) {
      console.log(`We couldn't get myStash coins`, error);
    } finally {
      client.release();
    }
  } else {
    // Forbidden
    res.sendStatus(403);
  }
});

module.exports = router;
