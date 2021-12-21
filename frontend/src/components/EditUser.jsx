import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { AccountContext } from "../context/AccountProvider";
import { useContext } from "react";
import useStyles from "./styles";
import { updateUser } from "../service/api";
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
  const [postData, setPostData] = useState({
    firstname: "",
      lastname: "",
      email: "",
      selectedFile: "",
  });
  const navigate = useNavigate();
  const classes = useStyles();
 const {account , setAccount} = useContext(AccountContext);

  const clear = () => {
    setPostData({
      firstname: "",
      lastname: "",
      email: "",
      selectedFile: "",
    });
  };
  const update = async () => {
      const post = await updateUser(account._id,postData);
      setAccount(post.data);
      navigate('/userdetails');

      console.log(post);
      console.log(account._id);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
      clear();
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        className={`${classes.root} ${classes.form}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
            Editing the user
        </Typography>
        <TextField
          name="firstname"
          variant="outlined"
          label="Firstname"
          fullWidth
          required
          defaultValue={account.firstname}
          onChange={(e) =>
            setPostData({ ...postData, firstname: e.target.value })
          }
        />
        <TextField
          name="lastname"
          variant="outlined"
          label="Lastname"
          fullWidth
          defaultValue={account.lastname}
          onChange={(e) => setPostData({ ...postData, lastname: e.target.value })}
        />
        <TextField
          name="email"
          variant="outlined"
          label="Email"
          fullWidth
          multiline
          defaultValue={account.email}
          rows={4}
          onChange={(e) =>
            setPostData({ ...postData, email: e.target.value })
          }
        />
        <div>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          className={classes.buttonSubmit}
          onClick={update}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default EditUser;