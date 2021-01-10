import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import MyCard from "../../components/MyCard";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

import "../../styling/orderPage.css";
import { Breed } from "../../components/MaterialUi";

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // console.log(user);

  return (
    <Layout>
      <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Account", href: "/account" },
            { name: "My Orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {user.orders &&
          user.orders.map((order) => {
            return order.items.map((item) => (
              <MyCard style={{ display: "block", margin: "5px 0" }}>
                <Link
                  to={`/order_details/${order._id}`}
                  className="orderItemContainer"
                >
                  <div className="orderImgContainer">
                    <img
                      className="orderImg"
                      src={item.productId.productPictures[0].img}
                      alt=""
                    />
                  </div>
                  <div className="orderRow">
                    <div className="orderName">{item.productId.name}</div>
                    <div className="orderPrice">
                      <BiRupee />
                      {item.payablePrice}
                    </div>
                    <div>{order.paymentStatus}</div>
                  </div>
                </Link>
              </MyCard>
            ));
          })}
      </div>
    </Layout>
  );
};

export default OrderPage;
