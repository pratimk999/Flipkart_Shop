import { authConstants } from "../actions/actionConstants";

const initState = {
  user: {
    firstName: "",
    email: "",
    lastName: "",
    username: "",
    conatctNumber: "",
  },
  token: "",
  loading: false,
  message: "",
  authenticate: false,
  authenticating: false,
  logOut: true,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.User,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        logOut: false,
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
        message: action.payload.message,
      };
      break;
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        logOut: true,
        loading: true,
      };
      break;
    case authConstants.SIGNUP_REQUEST:
      break;
    case authConstants.SIGNUP_SUCCESS:
      break;
    case authConstants.SIGNUP_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    default:
      break;
  }
  return state;
};

export default authReducer;
