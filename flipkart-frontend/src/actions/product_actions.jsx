import axios from "../helpers/axios";
import { productsBySlugConstants } from "./actionConstants";
export const getAllProductsBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/products/${slug}`);

    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: productsBySlugConstants.GET_ALL_PRODUCTS_BY_SLUG,
        payload: {
          products: res.data.products,
          productsByPrice: res.data.productsByPrice,
        },
      });
    } else {
      //!NOTE ERROR HANDLING
    }
  };
};
