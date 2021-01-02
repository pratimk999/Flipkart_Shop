import { productsBySlugConstants } from "../actions/actionConstants";

const initState = {
  products: [],
  productsByPrice: {
    productsBelow5k: [],
    productsBelow15k: [],
    productsBelow25k: [],
    productsBelow35k: [],
    productsAbove35k: [],
  },
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
    default:
      break;
  }
  return state;
};

export default productReducer;
