
import { CREATE_DATA, DELETE_DATA, EDIT_DATA } from "../actions/actions";
import initialdata from "../../initialData";

const inititalState = { dataList: initialdata };

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case CREATE_DATA:
      // console.log(action.payload);
      return {
        ...state,
        dataList: [...state.dataList, action.payload],
      };
    case EDIT_DATA:
      // state.dataList.map((data) => {
      //   return data.id === action.payload.id ? action.payload : data;
      // });
      console.log(action.payload);
      return {
        ...state,
        dataList: state.dataList.map((data)=>{
          return data.id === action.payload.id ? action.payload : data
        }),
      };
    case DELETE_DATA:
      return {
        ...state,
        dataList: state.dataList.filter((data) => {
          return data.id !== action.payload;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
