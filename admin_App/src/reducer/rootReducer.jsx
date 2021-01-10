import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import signupReducer from "./signup_reducer";
import categoryReducer from "./category_reducer";
import productReducer from "./product_reducer";
import orderReducer from "./order_reducer";
import newPageReducer from "./newPage_reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  userSignup: signupReducer,
  category: categoryReducer,
  product: productReducer,
  order: orderReducer,
  newPage: newPageReducer,
});

export default rootReducer;
