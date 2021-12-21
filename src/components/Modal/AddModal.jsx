import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./DeleteModal.styles.scss";
import { useDispatch } from "react-redux";
import { createDataAction } from "../../redux/actions/actions";

const AddModal = ({ handleClose, setRows }) => {
  const [newData, setNewData] = useState({
    id: "",
    title: "",
    state: "",
    url: "",
    created: new Date().toISOString,
    updated: new Date().toISOString,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    newData[key] = value;
    let data = Object.assign({}, newData);
    setNewData(data);
    // const key = e.target
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newData.id &&
      newData.title &&
      newData.state &&
      newData.url &&
      newData.created &&
      newData.updated
    ) {
      // if(newData[created])
      console.log(newData);
      dispatch(createDataAction(newData));
      setNewData({
        id: "",
        title: "",
        state: "",
        url: "",
        created: "",
        updated: "",
      });
      // handleClose();
    } else {
      // handleClose();
      return;
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="add__form">
        <TextField
          id="standard-basic"
          label="Id"
          variant="standard"
          required
          name="id"
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          required
          name="title"
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="State"
          variant="standard"
          required
          name="state"
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="Url"
          variant="standard"
          name="url"
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="Created at"
          variant="standard"
          name="created"
          onChange={handleChange}
          value={new Date().toISOString()}
        />

        <TextField
          id="standard-basic"
          label="Updated at"
          variant="standard"
          name="updated"
          onChange={handleChange}
          value={new Date().toISOString()}
        />
        <Button onClick={handleSubmit}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </form>
    </>
  );
};

export default AddModal;
