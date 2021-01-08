import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../actions";
import getParam from "../../../utils/getParam";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function ProductPage(props) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { page } = product;
  useEffect(() => {
    const params = getParam(props.location.search);
    dispatch(getProductPage(params));
  }, [dispatch, props.location.search]);
  console.log(props);
  return (
    <div style={{ margin: "0 10px" }}>
      <h4 style={{ marginTop: "15px", marginBottom: "15px" }}>{page.title}</h4>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => {
            return (
              <Link
                key={index}
                style={{ display: "block" }}
                to={banner.navigateTo}
              >
                <img src={banner.img} alt="" />
              </Link>
            );
          })}
      </Carousel>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {page.products &&
          page.products.map((product, index) => {
            return (
              <Link key={index} to={product.navigateTo}>
                <Card
                  style={{
                    width: "26rem",
                    padding: "10px",
                    outline: "none",
                    border: "none",
                  }}
                >
                  <Card.Img variant="top" src={product.img} />
                </Card>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default ProductPage;
