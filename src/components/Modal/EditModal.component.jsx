import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./DeleteModal.styles.scss";
import { editDataAction } from "../../redux/actions/actions";

const EditModal = ({ currentData, handleEditClose }) => {
  const [newData, setNewData] = useState({
    id: currentData.id,
    title: currentData.title,
    state: currentData.state,
    url: currentData.url,
    created: currentData.created,
    updated: currentData.updated,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    newData[key] = value;
    const data = newData;
    setNewData(data);
  };

  const handleSubmit = () => {
    console.log(newData);
    dispatch(editDataAction(newData));
    setNewData({
      id: "",
      title: "",
      state: "",
      url: "",
      created: "",
      updated: "",
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Id"
          variant="standard"
          required
          value={currentData.id}
          onChange={handleChange}
          name="id"
        />
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          required
          defaultValue={currentData.title}
          onChange={handleChange}
          name="title"
        />
        <TextField
          id="standard-basic"
          label="State"
          variant="standard"
          required
          defaultValue={currentData.state}
          onChange={handleChange}
          name="state"
        />
        <TextField
          id="standard-basic"
          label="Url"
          variant="standard"
          defaultValue={currentData.url}
          onChange={handleChange}
          name="url"
        />
        <TextField
          id="standard-basic"
          label="Created at"
          variant="standard"
          defaultValue={currentData.created}
          onChange={handleChange}
          name="created"
        />
        <TextField
          id="standard-basic"
          label="Updated at"
          variant="standard"
          defaultValue={currentData.updated}
          onChange={handleChange}
          name="updated"
        />
        <Button onClick={handleSubmit}>Save</Button>
        <Button onClick={handleEditClose}>Cancel</Button>
      </form>
    </>
  );
};

export default EditModal;
