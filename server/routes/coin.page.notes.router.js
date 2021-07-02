const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const axios = require("axios");

router.post("/v1/:name/:id", rejectUnauthenticated, async (req, res) => {
  console.log(req.body);
  console.log(`got to /api/coinNotes/v1`);
  if (req.isAuthenticated) {
    const queryPostText = `
    INSERT INTO notes (notes, coin_page_id)
    VALUES ($1, $2)
    `;
    try {
      const postToServer = await pool.query(queryPostText, [req.body.note, req.body.id]);
    } catch (error) {
      console.log(`We couldn't post your note... get it...`, error);
    }
  }
});

module.exports = router;
