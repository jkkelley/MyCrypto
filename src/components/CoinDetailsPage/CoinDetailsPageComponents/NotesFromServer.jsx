import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

// Material-ui Imports
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";

function NotesFromServer() {
  const handleAddNote = async () => {
    console.log(`You clicked handleAddNote`);
    const { value: text } = await Swal.fire({
        input: 'textarea',
        inputLabel: 'Note',
        inputPlaceholder: 'Type your Note here...',
        inputAttributes: {
          'aria-label': 'Type your Note here'
        },
        showCancelButton: true,
        allowOutsideClick: true,
        allowEnterKey: true,
        backdrop: true,
        inputValidator: (value) => {
            if (!value) {
              return `We can't leave notes blank...`;
            }
          },
      })
      
      if (text) {
        Swal.fire(text)
      }
  };
  return (
    <>
      <Button onClick={handleAddNote}>Add Note</Button>
    </>
  );
}

export default NotesFromServer;
