const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.post("/", rejectUnauthenticated, (req, res) => {
  const values = ({ first, last, nickname, email } = req.body);

  console.log(`line 10`, values);
  console.log(first, last, nickname, email);
  console.log(`You've arrived at /api/createProfile`, req.body);
  console.log(`What user am I?`, req.user.id);

  const queryText = `
    INSERT INTO user_profile (
        users_first_name,
        users_last_name,
        users_nickname,
        email,
        users_id
        )
    VALUES 
        ($1, $2, $3, $4, $5);
  `;
  if (req.isAuthenticated) {
    pool
      .query(queryText, [first, last, nickname, email, req.user.id])
      .then((results) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(`Error Creating Profile... ${error}`);
        res.sendStatus(500);
      });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
});

module.exports = router;
