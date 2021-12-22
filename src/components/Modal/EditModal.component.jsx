import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./DeleteModal.styles.scss";
import { editDataAction } from "../../redux/actions/actions";
import "./EditModal.styles.scss";

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
          className="input-field"
          id="standard-basic"
          label="Id"
          variant="standard"
          required
          value={currentData.id}
          onChange={handleChange}
          name="id"
          fullWidth={true}
        />
        <TextField
          className="input-field"
          id="standard-basic"
          label="Title"
          variant="standard"
          required
          defaultValue={currentData.title}
          onChange={handleChange}
          name="title"
          fullWidth={true}
        />
        <TextField
          className="input-field"
          id="standard-basic"
          label="State"
          variant="standard"
          required
          defaultValue={currentData.state}
          onChange={handleChange}
          name="state"
          fullWidth={true}
        />
        <TextField
          className="input-field"
          id="standard-basic"
          label="Url"
          variant="standard"
          defaultValue={currentData.url}
          onChange={handleChange}
          name="url"
          fullWidth={true}
        />
        <TextField
          className="input-field"
          id="standard-basic"
          label="Created at"
          variant="standard"
          defaultValue={currentData.created}
          onChange={handleChange}
          name="created"
          fullWidth={true}
        />
        <TextField
          className="input-field"
          id="standard-basic"
          label="Updated at"
          variant="standard"
          defaultValue={currentData.updated}
          onChange={handleChange}
          name="updated"
          fullWidth={true}
        />
        <div className="btn__container">
          <Button className="btn" onClick={handleSubmit}>
            Save
          </Button>
          <Button className="btn" onClick={handleEditClose}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditModal;
