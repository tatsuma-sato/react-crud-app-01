import React, { useState, createContext, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Add, Delete, Edit } from "@mui/icons-material";
import "./DataList.style.scss";
import { useSelector } from "react-redux";
import DeleteModal from "../Modal/DeleteModal.component";
import { Modal, Box } from "@mui/material";
import AddModal from "../Modal/AddModal";
import EditModal from "../Modal/EditModal.component";

export const userContext = createContext;

const DataList = () => {
  const dataList = useSelector((state) => state.dataList);

  const [currentData, setCurrentData] = useState({});
  const [rows, setRows] = useState(dataList);

  const [isShow, setIsShow] = useState(false);
  const [isEditShow, setIsEditShow] = useState(false);
  const [isDeleteShow, setIsDeleteShow] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    setRows(dataList);
    handleClose();
    handleEditClose();
    handleDeleteClose();
  }, [dataList]);

  const handleClose = () => {
    setIsShow(false);
  };
  const handleOpen = () => {
    setIsShow(true);
  };

  const handleEditClose = () => {
    setIsEditShow(false);
  };
  const handleDeleteClose = () => {
    setIsDeleteShow(false);
  };

  const columns = [
    { field: "id", headerName: "Id", width: 120 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "state", headerName: "State", width: 80 },
    {
      field: "url",
      headerName: "Url",
      // type: 'number',
      width: 450,
    },
    {
      field: "created",
      headerName: "Created at",
      width: 160,
    },
    {
      field: "updated",
      headerName: "Updated at",
      width: 160,
    },
    {
      field: "actions",
      type: "actions",
      width: 120,
      sortable: false,
      renderHeader: (params) => (
        <Add onClick={handleOpen} className="addButton" />
      ),
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          onClick={() => {
            console.log("edit");
            console.log(params.row);
            setCurrentData(params.row);
            setIsEditShow(true);
          }}
          label="Edit"
        />,
        <GridActionsCellItem
          icon={<Delete />}
          onClick={() => {
            console.log("delete");
            console.log(params);
            setCurrentData(params.row);
            setIsDeleteShow(true);
          }}
          label="Delete"
        />,
      ],
    },
  ];

  console.log(rows);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "10px",
  };

  return (
    <div style={{ height: 400, width: "100%" }} className="data__container">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableColumnMenu
      />

      {/* <Add/> */}
      <Modal open={isShow} onClose={handleClose}>
        <Box sx={style}>
          <h2>Add new issue</h2>
          <AddModal handleClose={handleClose} setRows={setRows} />
        </Box>
      </Modal>

      {isEditShow && (
        <Modal open={isEditShow} onClose={handleEditClose}>
          <Box sx={style}>
            <h2>Edit issue</h2>
            <EditModal
              currentData={currentData}
              handleEditClose={handleEditClose}
            />
          </Box>
        </Modal>
      )}

      {isDeleteShow && (
        <Modal open={isDeleteShow} onClose={handleDeleteClose}>
          <Box sx={style}>
            <h2>Are you sure?</h2>
            <DeleteModal
              currentData={currentData}
              handleDeleteClose={handleDeleteClose}
            />
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default DataList;
