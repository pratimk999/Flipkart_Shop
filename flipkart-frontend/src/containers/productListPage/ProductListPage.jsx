import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsBySlug } from "../../actions";
import "../../styling/productListPage.css";
import { productImageBaseUrl } from "../../urlConfig";
function ProductListPage(props) {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState({
    productsBelow5k: "below 5000",
    productsBelow15k: "below 15000",
    productsBelow25k: "below 25000",
    productsBelow35k: "below 35000",
    productsAbove35k: "above 35000",
  });
  useEffect(() => {
    const { match } = props;
    dispatch(getAllProductsBySlug(match.params.slug));
  }, [dispatch, props]);
  return (
    <Layout>
      {Object.keys(product.productsByPrice).map((key, index) => {
        if (product.productsByPrice[key].length) {
          return (
            <div className="card">
              <div className="cardHeader">
                <div>
                  {props.match.params.slug} mobile {priceRange[key]}
                </div>
                <button>View all</button>
              </div>
              <div style={{ display: "flex" }}>
                {product.productsByPrice[key].map((productItem) => (
                  <div className="productContainer">
                    <div className="productImgContainer">
                      <img
                        src={productImageBaseUrl(
                          productItem.productPictures[0].img
                        )}
                        alt=""
                      />
                    </div>
                    <div className="productInfo">
                      <div style={{ margin: "5px 0", fontSize: "14px" }}>
                        {productItem.name}
                      </div>
                      <div>
                        <span>4.0</span>&nbsp;
                        <span>(33333)</span>
                      </div>
                      <div className="productPrice">{productItem.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </Layout>
  );
}

export default ProductListPage;
