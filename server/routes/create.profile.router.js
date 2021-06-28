const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET routes
router.get("/", rejectUnauthenticated, (req, res) => {
  console.log(`You got to /api/createProfile GET`, req.user.id);
  // Wash you're hands please
  const queryText = `
        SELECT * FROM user_profile
        WHERE users_id=$1
    `;
  // Do you belong in this realm???
  if (req.isAuthenticated) {
    // Ok, You can jump in.
    pool
      .query(queryText, [req.user.id])
      .then((results) => {
        res.send(results.rows);
      })
      .catch((error) => {
        console.log(`Hey Profile Driver, We have a GET error... ${error}`);
        // Send back a lost in space code
        res.sendStatus(500);
      });
  } else {
    // Must be FORBIDDEN to get this code
    res.sendStatus(403);
  }
});

// POST routes
router.post("/", rejectUnauthenticated, (req, res) => {
  const values = ({ first, last, nickname, email } = req.body);
  const profileTrue = true;
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
        users_profile,
        users_id
        )
    VALUES 
        ($1, $2, $3, $4, $5, $6);
  `;
  if (req.isAuthenticated) {
    pool
      .query(queryText, [
        first,
        last,
        nickname,
        email,
        profileTrue,
        req.user.id,
      ])
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

// PUT routes
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const { first, last, nickname, email, image, phone_number } = req.body;

  if ("first" in req.body) {
    console.log("in first name update");
    const queryText = `
      UPDATE user_profile SET users_first_name=$1
      WHERE users_id=$2
    `;
    pool
      .query(queryText, [first, req.user.id])
      .then((results) => {
        res.send(results.rows);
      })
      .catch((error) => {
        console.log(`We had an error with first name UPDATE`, error);
        res.sendStatus(500);
      });
  }
  if ("last" in req.body) {
    console.log("in last name update");
    const queryText = `
      UPDATE user_profile SET users_last_name=$1
      WHERE users_id=$2
    `;
    pool
      .query(queryText, [last, req.user.id])
      .then((results) => {
        res.send(results.rows);
      })
      .catch((error) => {
        console.log(`We had an error with last name UPDATE`, error);
        res.sendStatus(500);
      });
  }
  if ("nickname" in req.body) {
    console.log("in nickname update");
    const queryText = `
      UPDATE user_profile SET users_nickname=$1
      WHERE users_id=$2
    `;
    pool
      .query(queryText, [nickname, req.user.id])
      .then((results) => {
        res.send(results.rows);
      })
      .catch((error) => {
        console.log(`We had an error with nickname UPDATE`, error);
        res.sendStatus(500);
      });
  }
  if ("email" in req.body) {
    console.log("in email update");
    const queryText = `
      UPDATE user_profile SET email=$1
      WHERE users_id=$2
    `;
    pool
      .query(queryText, [email, req.user.id])
      .then((results) => {
        res.send(results.rows);
      })
      .catch((error) => {
        console.log(`We had an error with email UPDATE`, error);
        res.sendStatus(500);
      });
  }
  if ("phone_number" in req.body) {
    console.log("in phone_number update");
    const queryText = `
      UPDATE user_profile SET phone_number=$1
      WHERE users_id=$2
    `;
    pool
      .query(queryText, [phone_number, req.user.id])
      .then((results) => {
        res.send(results.rows);
      })
      .catch((error) => {
        console.log(`We had an error with phone_number UPDATE`, error);
        res.sendStatus(500);
      });
  }
});

module.exports = router;
