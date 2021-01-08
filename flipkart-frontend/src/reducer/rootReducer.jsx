import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import cartReducer from "./cart_reducer";
import categoryReducer from "./category_reducer";
import productreducer from "./product_reducer";
import userReducer from "./user_reducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productreducer,
  auth: authReducer,
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;
