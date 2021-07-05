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
      await client.query("COMMIT");

      res.sendStatus(201);
    } catch (error) {
      console.log(`We couldn't post your note... get it...`, error);
      res.sendStatus(500);
    } finally {
      client.release();
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
    SELECT crypto_name, notes.coin_page_id as id, notes.id as notes_id, notes.notes as notes from coin_page
    join notes on notes.coin_page_id = coin_page.id
    WHERE coin_page.id=$1
    ORDER BY notes.id DESC
    ;
    `;
    const nameUpper = req.params.name.toUpperCase();
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
    console.log(`/v1/update => `, req.body);
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
          req.body.notes_id,
        ]);
        await res.sendStatus(201);
      } catch (error) {
        console.log(`We couldn't handle you're note update`, error);
        res.sendStatus(500);
      }
    } else {
    }
  }
);

router.delete(
  "/v1/delete/:name/:notes_id/:coin_page_id/:id",
  rejectUnauthenticated,
  async (req, res) => {
    console.log(`delete coin note params =>`, req.params);
    const { coin_page_id, notes_id } = req.params;
    console.log(`Note id =>`, req.params.notes_id);
    if (req.isAuthenticated) {
      try {
        const queryNoteDeleteText = `
        DELETE FROM notes
        WHERE coin_page_id=$1 and id=$2;
        `;
        await pool.query(queryNoteDeleteText, [
          Number(coin_page_id),
          Number(notes_id),
        ]);
        await res.sendStatus(201);
      } catch (error) {
        console.log(
          `We couldn't delete your note for this ${req.params.name}.`,
          error
        );
        res.sendStatus(500);
      }
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }
);

module.exports = router;
