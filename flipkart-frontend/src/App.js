import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductListPage from "./containers/productListPage/ProductListPage";
import Home from "./containers/homePage/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
