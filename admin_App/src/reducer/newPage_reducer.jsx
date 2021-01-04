const { pageConstants } = require("../actions/actionConstants");

const initState = {
  error: null,
  loading: false,
  page: {},
};

const newPageReducer = (state = initState, action) => {
  switch (action.type) {
    case pageConstants.CREATE_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case pageConstants.CREATE_PAGE_SUCCESS:
      state = {
        ...state,
        loading: true,
        page: action.payload.page,
      };
      break;
    case pageConstants.CREATE_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    default:
      break;
  }
};

export default newPageReducer;
