import { authConstants } from "./actionConstants";
import axios from "../helpers/axios";
const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });

    const response = await axios.post(`/admin/signin`, {
      ...user,
    });
    if (response.status === 200) {
      const { User, token } = response.data;
      // User.isLoggedIn = true;
      window.localStorage.setItem("token", JSON.stringify(token));
      window.localStorage.setItem("user", JSON.stringify(User));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          User,
          token,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: "ERROR",
        },
      });
    }
  };
};

// !NOTE ANOTHER ISLOGGEDIN FUNCTION WILL BE HERE WHICH WILL DISPATCH AN ACTION AND SET THE USER DATA IF AN USER IS PRESENT IN LOCALSTORAGE
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    if (token) {
      const User = JSON.parse(window.localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          User,
          token,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: "ERROR",
        },
      });
    }
  };
};

const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axios(`/admin/logout`);

    if (res.status === 200) {
      window.localStorage.clear();
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
        payload: {
          message: res.data.message,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export { signout, login };
