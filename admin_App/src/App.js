import { Route, Switch } from "react-router-dom";
import Home from "./containers/home/Home";
import Signin from "./containers/signin/Signin";
import Signup from "./containers/signup/Signup";
import React, { useEffect } from "react";
import PrivateRoute from "./components/higherComponents/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions/";
import Product from "./containers/products/Product";
import Order from "./containers/orders/Order";
import Category from "./containers/category/Category";
import { getInitialData } from "./actions";
import NewPage from "./containers/newPage/NewPage";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate, dispatch]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/page" component={NewPage} />
        <PrivateRoute path="/categories" component={Category} />
        <PrivateRoute path="/products" component={Product} />
        <PrivateRoute path="/orders" component={Order} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
