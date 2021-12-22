import React, { useState, createContext, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Add, Delete, Edit, Replay } from "@mui/icons-material";
import "./DataList.style.scss";
import { useSelector } from "react-redux";
import DeleteModal from "../Modal/DeleteModal.component";
import { Modal, Box, TextField } from "@mui/material";
import AddModal from "../Modal/AddModal";
import EditModal from "../Modal/EditModal.component";
import { store } from "../../redux/store/store";
import SearchBar from "material-ui-search-bar";

export const userContext = createContext;

const DataList = () => {
  const dataList = useSelector((state) => state.dataList);

  const [pageSize, setPageSize] = useState(5);
  const [currentData, setCurrentData] = useState({});
  const [rows, setRows] = useState(dataList);

  const [searched, setSearched] = useState("");

  const [isShow, setIsShow] = useState(false);
  const [isEditShow, setIsEditShow] = useState(true);
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

  const handleReload = (e) => {
    e.preventDefault();
    /* I can not implement function for reload data list */
  };

  const handleSearch = (e) => {
    const searchedVal = e.target.value;
    console.log(searchedVal);
    const filteredRows = dataList.filter((row) => {
      return row.title.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    handleSearch(searched);
  };

  const columns = [
    { field: "id", headerName: "Id", width: 120 },
    { field: "title", headerName: "Title", width: 450 },
    { field: "state", headerName: "State", width: 80 },
    {
      field: "url",
      headerName: "Url",
      // type: 'number',
      width: 380,
    },
    {
      field: "created",
      headerName: "Created at",
      width: 240,
    },
    {
      field: "updated",
      headerName: "Updated at",
      width: 240,
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
          icon={<Edit className="material-icon" />}
          onClick={() => {
            console.log("edit");
            console.log(params.row);
            setCurrentData(params.row);
            setIsEditShow(true);
          }}
          label="Edit"
        />,
        <GridActionsCellItem
          icon={<Delete className="material-icon" />}
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
  const style__delete = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "10px",
  };

  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__left">
            <h2>Angular 9 MatTable CRUD Example</h2>
          </div>
          <div className="header__right">
            <h2>Reload data:</h2>
            <h2>
              <a href="" onClick={handleReload}>
                {<Replay className="header__right__icon" />}
              </a>
            </h2>
          </div>
        </div>
      </header>
      <div className="container">
        <TextField
          id="standard-basic"
          label="Filter Issues"
          variant="standard"
          onChange={handleSearch}
          className="filter-bar"
          fullWidth={true}
          margin="nomal"
        />
        <div
          style={{ width: "100%", textAlign: "left" }}
          className="data__container"
        >
          <DataGrid
            sx={{ border: "none" }}
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 25, 100]}
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
                <h2>Issue ID: {currentData.id}</h2>
                <EditModal
                  currentData={currentData}
                  handleEditClose={handleEditClose}
                />
              </Box>
            </Modal>
          )}

          {isDeleteShow && (
            <Modal open={isDeleteShow} onClose={handleDeleteClose}>
              <Box sx={style__delete}>
                <h2 style={{ padding: "0 10px" }}>Are you sure?</h2>
                <DeleteModal
                  currentData={currentData}
                  handleDeleteClose={handleDeleteClose}
                />
              </Box>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default DataList;
