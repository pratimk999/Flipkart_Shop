import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductListPage from "./containers/productListPage/ProductListPage";
import Home from "./containers/homePage/Home";
import { isUserLoggedIn } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsPage from "./containers/productDetailsPage/ProductDetailsPage";
import CartPage from "./containers/cartPage/CartPage";
import CheckoutPage from "./containers/checkOutPage/CheckOutPage";
import OrderPage from "./containers/orderPage/OrderPage";
import OrderDetailsPage from "./containers/orderDetailsPage/OrderDetailsPage";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate, dispatch]);
  // useEffect(() => {
  //   console.log("App.js - updateCart");
  //   dispatch(updateCart());
  // }, [auth.authenticate]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/account/orders" component={OrderPage} />
          <Route path="/order_details/:orderId" component={OrderDetailsPage} />
          <Route
            path="/:productSlug/:productId/p"
            component={ProductDetailsPage}
          />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
