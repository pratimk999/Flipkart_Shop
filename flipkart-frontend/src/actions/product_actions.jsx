import axiosInstance from "../helpers/axios";
import axios from "../helpers/axios";
import { productConstants, productsBySlugConstants } from "./actionConstants";
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

export const getProductPage = (payload) => {
  return async (dispatch) => {
    let res;
    try {
      dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
      const { categoryId, type } = payload;
      res = await axios.get(`/admin/page/${categoryId}/${type}`);

      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
          payload: {
            page: res.data.Page,
          },
        });
      } else {
        //!NOTE ERROR HANDLING
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_FAILURE,
          payload: {
            error: res.data.message,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_PRODUCT_PAGE_FAILURE,
        payload: {
          error: res.data.message,
        },
      });
    }
  };
};

//!NOTE GET PRODUCT DETAILS BY ID

export const getProductDetailsById = (id) => {
  return async (dispatch) => {
    let res;
    try {
      dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
      const productId = id;
      res = await axios.get(`/product/${productId}`);
      console.log(res);
      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
          payload: {
            product: res.data.product,
          },
        });
      } else {
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_FAILURE,
          payload: {
            error: res.data.message,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_PRODUCT_PAGE_FAILURE,
        payload: {
          error: res.data.message,
        },
      });
    }
  };
};
