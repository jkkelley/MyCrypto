import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import "../CoinDetailsPageCSS/CoinDetailsPage.css";

// Material-ui Imports
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 380,
    // margin: "10 2px",
    margin: "15px 0",
    cursor: {
      hoover: "default",
    },
    boxShadow:  "0 3px 5px 2px #3f51b5",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    fontFamily: "'Exo', sans-serif",
    textAlign: "left",
    color: "black",
  },
});

function CoinPageNotes({ notes, index }) {
  const classes = useStyles();
  const coinInfoReducer = useSelector((store) => store.coinInfoReducer);
  console.log(`Notes page => `, notes);
  console.log(`index page => `, index);
  const coinNotes = useSelector((store) => store.coinNotes);
  console.log(`coinNotes => `, coinNotes);
  const params = useParams();
  const user = useSelector((store) => store.user);
  // Bring in dispatch
  const dispatch = useDispatch();
  // Function to Handle clicking on note to edit.
  const handleNoteClick = async (note) => {
    console.log(note);
    console.log(params);
    await Swal.fire({
      title: "Want to Edit?",
      input: "textarea",
      inputValue: note.notes,
      allowOutsideClick: true,
      allowEnterKey: true,
      backdrop: true,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `Delete`,
      customClass: {
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        console.log(result.value);
        console.log(notes);
        console.log(note.coin_page_id);
        dispatch({
          type: "UPDATE_COIN_NOTE",
          payload: {
            coin_page_id: coinInfoReducer?.amount_owned[0]?.id,
            id: coinInfoReducer?.amount_owned[0]?.id,
            updated_note: result.value,
            notes_id: notes.notes_id,
            crypto_name: params.id,
          },
        });
      } else if (result.isDenied) {
        console.log(note);
        dispatch({
          type: "DELETE_COIN_NOTE",
          payload: {
            id: coinInfoReducer?.amount_owned[0]?.id,
            notes_id: notes.notes_id,
            crypto_name: params.id,
            coin_page_id: coinInfoReducer?.amount_owned[0]?.id,
          },
        });
      }
    });
  };
  return (
    <>
      <div className="coin-notes-container">
        <Card
          className={classes.root}
          onClick={() => handleNoteClick(notes)}
          variant="outlined"
        >
          <CardContent>
            <Typography className={classes.pos} color="textSecondary">
              {notes.notes}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default CoinPageNotes;
