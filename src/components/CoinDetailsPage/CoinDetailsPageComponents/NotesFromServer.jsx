import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

// Material-ui Imports
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";

function NotesFromServer() {
  // Bring in dispatch
  const dispatch = useDispatch();
  // Bring in params
  const params = useParams();
  // Need the user from store
  const user = useSelector((store) => store.user);
  const coinInfoReducer = useSelector(store => store.coinInfoReducer)
  const handleAddNote = async () => {
    console.log(`You clicked handleAddNote`);
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Note",
      inputPlaceholder: "Type your Note here...",
      inputAttributes: {
        "aria-label": "Type your Note here",
      },
      showCancelButton: true,
      allowOutsideClick: true,
      allowEnterKey: true,
      backdrop: true,
      inputValidator: (value) => {
        if (!value) {
          return `We can't leave notes blank...`;
        } else {
          console.log(value);
          // coinInfoReducer?.amount_owned.id
          dispatch({
            type: "POST_COIN_NOTE",
            payload: { note: value, name: params.id, id: coinInfoReducer?.amount_owned[0]?.id },
          });
        }
      },
    });
  };
  return (
    <>
      <Button onClick={handleAddNote}>Add Note</Button>
    </>
  );
}

export default NotesFromServer;
