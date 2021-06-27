import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material-ui Imports
import { makeStyles } from "@material-ui/core/styles";

import "./CreateProfilePage.css";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));

function CreateProfilePage() {
     // Custom CSS
    const classes = useStyles();

    

    return (
        <>
            <div className="create-profile-container">
                
                <div className="create-form">
                    <p>Create Profile Page</p>
                    <form className="create-profile-page-form-container">
                        <TextField 
                            placeholder="Add an Image"
                        />
                        <TextField 
                            required
                            placeholder="First Name"
                        />
                        <TextField 
                            placeholder="Last Name"
                        />
                        <TextField 
                            required
                            placeholder="Nickname"
                        />
                        <TextField 
                            required
                            placeholder="email"
                        />
                        <TextField 
                            placeholder="Phone #"
                        />

                        <Button variant="outlined" >
                            Add
                        </Button>
                        
                    </form>
                </div>
            </div>
        </>
        
    )
}

export default CreateProfilePage