import { Button } from "@mui/material";
import "./DeleteModal.styles.scss";
import { useDispatch } from "react-redux";
import { deleteDataAction } from "../../redux/actions/actions";

const DeleteModal = ({ currentData, handleDeleteClose }) => {
  console.log(currentData);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteDataAction(id));
  };
  return (
    <div className="delete__container">
      <ul>
        <li>id: {currentData.id}</li>
        <li>Title: {currentData.title}</li>
        <li>State: {currentData.state}</li>
        <li>Url: {currentData.url}</li>
      </ul>
      <div className="btn__container">
        <Button onClick={() => handleDelete(currentData.id)}>Delete</Button>
        <Button onClick={handleDeleteClose}>Cancel</Button>
      </div>
    </div>
  );
};

export default DeleteModal;
