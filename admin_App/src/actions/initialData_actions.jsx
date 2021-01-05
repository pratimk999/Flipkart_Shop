import axios from "../helpers/axios";
import { productConstants, categoryConstants } from "./actionConstants";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.post(`/initialData`);

    if (res.status === 200) {
      const { allCategories, allProducts } = res.data;
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: {
          allProducts: allProducts,
        },
      });
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: {
          allCategories: allCategories,
        },
      });
    }
  };
};
