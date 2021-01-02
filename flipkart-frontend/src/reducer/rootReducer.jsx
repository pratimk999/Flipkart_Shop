import { combineReducers } from "redux";
import categoryReducer from "./category_reducer";
import productreducer from "./product_reducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productreducer,
});

export default rootReducer;
