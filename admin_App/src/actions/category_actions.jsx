import axios from "../helpers/axios";
import { categoryConstants } from "./actionConstants";
const getAllCategories = () => {
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

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.CREATE_CATEGORY_REQUEST });
    const res = await axios.post(`/category/create`, form);

    if (res.status === 200) {
      dispatch({
        type: categoryConstants.CREATE_CATEGORY_SUCCESS,
        payload: {
          createdCategory: res.data.createdCategory,
        },
      });
    } else {
      dispatch({
        type: categoryConstants.CREATE_CATEGORIES_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST });
    const res = await axios.post(`/category/update`, form);

    if (res.status === 200) {
      dispatch({
        type: categoryConstants.UPDATE_CATEGORY_SUCCESS,
        payload: {
          updatedCategories: res.data.updatedCategories,
        },
      });
      dispatch(getAllCategories());
    } else {
      dispatch({
        type: categoryConstants.UPDATE_CATEGORY_FAILURE,
        payload: {
          error: "ERROR",
        },
      });
    }
  };
};

export const deleteCategories = (idsArray) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST });
    const res = await axios.post(`/category/delete`, {
      payload: {
        idsArray,
      },
    });

    if (res.status === 200) {
      dispatch({
        type: categoryConstants.DELETE_CATEGORY_SUCCESS,
        payload: {
          message: res.data.message,
        },
      });

      dispatch(getAllCategories());
    } else {
      dispatch({
        type: categoryConstants.DELETE_CATEGORY_FAILURE,
        payload: {
          error: res.data.message,
        },
      });
    }
  };
};

export { getAllCategories };
