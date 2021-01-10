import { authConstants, cartConstants } from "./actionConstants";
import axios from "../helpers/axios";

export const signup = (user) => {
  return async (dispatch) => {
    let res;
    dispatch({ type: authConstants.SIGNUP_REQUEST });
    res = await axios.post(`/signup`, user);
    try {
      if (res.status === 200) {
        dispatch({ type: authConstants.SIGNUP_SUCCESS });
        const { user } = res.data;
        // localStorage.setItem("token", token);
        // localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.SIGNUP_SUCCESS,
          payload: {
            user,
          },
        });
      } else {
        const { error } = res.data;
        dispatch({ type: authConstants.SIGNUP_FAILURE, payload: { error } });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: authConstants.SIGNUP_FAILURE,
        payload: { error: data.error },
      });
    }
  };
};
export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });

    const response = await axios.post(`/signin`, {
      ...user,
    });
    console.log("RES", response);
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

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axios(`/logout`);

    if (res.status === 200) {
      window.localStorage.clear();
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
        payload: {
          message: res.data.message,
        },
      });
      dispatch({ type: cartConstants.RESET_CART });
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
