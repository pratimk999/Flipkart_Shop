import axios from "../helpers/axios";
import { categoryConstants } from "./actionConstants";
export const getAllCategories = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
    const res = await axios.get(`/category`);

    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: {
          allCategories: res.data.Categories,
        },
      });
    } else {
      dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_FAILURE });
    }
  };
};
