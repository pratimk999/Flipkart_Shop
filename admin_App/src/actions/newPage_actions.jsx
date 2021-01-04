import axios from "../helpers/axios";
import { pageConstants } from "./actionConstants";

export const createPage = (form) => {
  return async (dispatch) => {
    dispatch({ type: pageConstants.CREATE_PAGE_REQUEST });
    try {
      const res = await axios.post(`/admin/page/create`, form);

      if (res.status === 200) {
        dispatch({
          type: pageConstants.CREATE_PAGE_SUCCESS,
          payload: {
            page: res.data.newPage,
          },
        });
      } else {
        dispatch({
          type: pageConstants.CREATE_PAGE_FAILURE,
          payload: {
            error: res.data.message,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
