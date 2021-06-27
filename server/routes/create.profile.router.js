const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");


router.post("/", rejectUnauthenticated, (req, res) => {

    console.log(`You've arrived at /api/createProfile`, req.body)
    console.log(`What user am I?`, req.user)
})

module.exports = router;
