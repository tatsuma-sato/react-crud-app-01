export const CREATE_DATA = "CREATE_DATA";
export const DELETE_DATA = "DELETE_DATA";
export const EDIT_DATA = "EDIT_DATA";

export const createDataAction = (data) => {
  return { type: CREATE_DATA, payload: data };
};

export const deleteDataAction = (id) => {
  return { type: DELETE_DATA, payload: id };
};

export const editDataAction = (data) => {
  return { type: EDIT_DATA, payload: data };
};
