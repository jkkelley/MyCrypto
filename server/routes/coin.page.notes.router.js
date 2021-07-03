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
  const client = await pool.connect();

  if (req.isAuthenticated) {
    const queryPostText = `
    INSERT INTO notes (notes, coin_page_id)
    VALUES ($1, $2) RETURNING id;
    `;
    try {
      await client.query("BEGIN");
      const postNoteToServer = await client.query(queryPostText, [
        req.body.note,
        req.body.id,
      ]);
      const notesId = postNoteToServer.rows[0].id;
      console.log(notesId);
      await client.query('COMMIT')

      res.sendStatus(201);
    } catch (error) {
      console.log(`We couldn't post your note... get it...`, error);
      res.sendStatus(500);
    }
  } else {
    // Forbidden
    res.sendStatus(403);
  }
});

router.get("/v1/:name/:id", rejectUnauthenticated, async (req, res) => {
  console.log(`GET Notes Says... =>`, req.params);
  if (req.isAuthenticated) {
    const queryGetText = `
    SELECT * FROM notes
    WHERE coin_page_id=$1 
    ORDER BY id DESC;
    `;
    try {
      const getFromServer = await pool.query(queryGetText, [
        Number(req.params.id),
      ]);
      console.log(getFromServer.rows);
      await res.send(getFromServer.rows);
    } catch (error) {
      console.log(`We had a problem GETTING your notes`, error);
      res.sendStatus(500);
    }
  } else {
    // Forbidden
    res.sendStatus(403);
  }
});

router.put(
  "/v1/update/note/:name/:id",
  rejectUnauthenticated,
  async (req, res) => {
    console.log(
      `/api/coinNotes/v1/update/note/:name/${req.body.coin_page_id} => ${req.body.updated_note}`
    );
    console.log(`req.body.name => `, req.query);
    if (req.isAuthenticated) {
      const queryPutText = `
    UPDATE notes SET notes=$1
    WHERE coin_page_id=$2 and id=$3
    `;
      // WRITE THE REST OF THE CODE!!!! *****
      try {
        await pool.query(queryPutText, [
          req.body.updated_note,
          req.body.coin_page_id,
          req.body.note_id,
        ]);
        await res.sendStatus(201);
      } catch (error) {
        console.log(`We couldn't handle you're note update`, error);
        res.sendStatus(500);
      }
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }
);

module.exports = router;
