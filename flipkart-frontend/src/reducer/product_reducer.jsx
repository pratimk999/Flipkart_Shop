import {
  productConstants,
  productsBySlugConstants,
} from "../actions/actionConstants";

const initState = {
  products: [],
  productsByPrice: {
    productsBelow5k: [],
    productsBelow15k: [],
    productsBelow25k: [],
    productsBelow35k: [],
    productsAbove35k: [],
  },
  pageReq: false,
  page: {},
  error: null,
  productDetails: {},
  loading: false,
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case productsBySlugConstants.GET_ALL_PRODUCTS_BY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
        productsByPrice: action.payload.productsByPrice,
      };
      break;
    case productConstants.GET_PRODUCT_PAGE_REQUEST:
      state = {
        ...state,
        pageReq: true,
      };
      break;
    case productConstants.GET_PRODUCT_PAGE_SUCCESS:
      state = {
        ...state,
        page: action.payload.page,
        pageReq: false,
      };
      break;
    case productConstants.GET_PRODUCT_PAGE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        pageReq: false,
      };
      break;
    case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        productDetails: action.payload.product,
      };
      break;
    case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    default:
      break;
  }
  return state;
};

export default productReducer;
