import { signUpConstants } from "./actionConstants";
import axios from "../helpers/axios";
export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: signUpConstants.SIGNUP_REQUEST });

    const response = await axios.post(`/admin/signup`, {
      ...user,
    });
    if (response.status === 200) {
      const { message } = response.data;
      dispatch({
        type: signUpConstants.SIGNUP_SUCCESS,
        payload: {
          message,
        },
      });
    } else {
      dispatch({
        type: signUpConstants.LOGIN_FAILURE,
        payload: {
          error: "ERROR",
        },
      });
    }
  };
};
