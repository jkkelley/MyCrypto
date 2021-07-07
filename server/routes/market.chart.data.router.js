const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET routes
router.get("/v1/:coin", rejectUnauthenticated, async (req, res) => {
  const client = await pool.connect();
  console.log(`You got to /api/marketChart/v1/${req.params.coin}`);
  if (req.isAuthenticated) {
    try {
      await client.query("BEGIN");
      await client.query("COMMIT");
      res.sendStatus(201);
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
