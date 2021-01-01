import { productConstants } from "../actions/actionConstants";

const initState = {
  products: [],
  newlyCreatedProduct: [],
  loading: false,
  error: null,
};

const newlyRenderedProductList = (products, createdProduct) => {
  let updatedProducts = [];

  updatedProducts.push(...products, ...createdProduct);
  return updatedProducts;
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.allProducts,
        loading: false,
      };
      break;
    case productConstants.GET_ALL_PRODUCTS_FAILURE:
      state = {
        ...initState,
        error: action.payload.error,
      };
      break;
    case productConstants.CREATE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.CREATE_PRODUCT_SUCCESS:
      const updatedProductList = newlyRenderedProductList(
        state.products,
        action.payload.product
      );
      state = {
        ...state,
        newlyCreatedProduct: action.payload.product,
        loading: false,
        products: updatedProductList,
      };
      break;
    case productConstants.CREATE_PRODUCT_FAILURE:
      state = {
        ...initState,
        error: action.payload.error,
      };
      break;
    default:
      break;
  }

  return state;
};

export default productReducer;
