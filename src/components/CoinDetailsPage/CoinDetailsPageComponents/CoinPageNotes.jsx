import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

// Material-ui Imports
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";

function CoinPageNotes({ notes }) {
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
        console.log(notes.coin_page_id);
        dispatch({
          type: "UPDATE_COIN_NOTE",
          payload: {
            coin_page_id: notes.coin_page_id,
            updated_note: result.value,
            note_id: note.id,
            name: params.id,
          },
        });
      } else if (result.isDenied) {
        console.log(note);
        dispatch({
          type: "DELETE_COIN_NOTE",
          payload: {
            coin_page_id: notes.coin_page_id,
            note_id: note.id,
            crypto_name: params.id,
            id: user.id,
          },
        });
        // Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  return (
    <>
      <p onClick={() => handleNoteClick(notes)}>{notes.notes}</p>
    </>
  );
}

export default CoinPageNotes;
