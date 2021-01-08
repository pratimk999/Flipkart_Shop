import React from "react";
import Layout from "../../components/Layout";
import "../../styling/productListPage.css";
import getParam from "../../utils/getParam";
import ProductPage from "./productPage/ProductPage";
import ProductStore from "./productStorePage/ProductStore";
function ProductListPage(props) {
  const renderProduct = () => {
    const params = getParam(props.location.search);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
      case "page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = null;
        break;
    }
    return content;
  };
  return <Layout>{renderProduct()}</Layout>;
}

export default ProductListPage;
