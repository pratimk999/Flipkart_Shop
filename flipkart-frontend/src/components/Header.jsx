import React, { useEffect, useState } from "react";
import flipkartLogo from "../images/logo/flipkart.PNG";
import goldenStar from "../images/logo/golden-star.PNG";
import "../styling/header.css";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../components/MaterialUi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, signout } from "../actions/auth_actions";

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onLogin = () => {
    dispatch(login({ email, password }));
    setLoginModal(false);
  };

  const logOut = () => {
    dispatch(signout());
    setEmail("");
    setPassword("");
  };

  useEffect(() => {}, [auth.authenticate, dispatch]);

  //!NOTE FOR LOGGEDIN USER

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <Link
            to="#"
            style={{
              textDecoration: "none",
              color: "#fff",
              fontWeight: "bold",
              marginRight: "30px",
            }}
          >
            {auth.user.firstName}
          </Link>
        }
        menus={[
          { label: "My Profile", to: "", icon: null },
          { label: "SuperCoin Zone", to: "", icon: null },
          { label: "Flipkart Plus Zone", to: "", icon: null },
          { label: "Orders", to: "", icon: null },
          { label: "Wishlist", to: "", icon: null },
          { label: "My Chats", to: "", icon: null },
          { label: "Coupons", to: "", icon: null },
          { label: "Gift Cards", to: "", icon: null },
          { label: "Notifications", to: "", icon: null },
          { label: "Log Out", to: "", icon: null, onClick: logOut },
        ]}
      />
    );
  };

  //!NOTE FOR NONLOGGEDIN USER

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <Link
            to="#"
            className="loginButton"
            onClick={() => setLoginModal(true)}
            style={{ textDecoration: "none" }}
          >
            Login
          </Link>
        }
        menus={[
          { label: "My Profile", to: "", icon: null },
          { label: "SuperCoin Zone", to: "", icon: null },
          { label: "Flipkart Plus Zone", to: "", icon: null },
          { label: "Orders", to: "", icon: null },
          { label: "Wishlist", to: "", icon: null },
          { label: "Rewards", to: "", icon: null },
          { label: "Gift Cards", to: "", icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <Link style={{ color: "#2874f0", textDecoration: "none" }} to="#">
              Sign Up
            </Link>
          </div>
        }
      />
    );
  };

  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <MaterialInput
                type="text"
                label="Enter Email/Enter Mobile Number"
                value={email}
                style={{ marginBottom: "20px" }}
                onChange={(e) => setEmail(e.target.value)}
              />

              <MaterialInput
                type="password"
                label="Enter Password"
                style={{ marginTop: "10px", marginBottom: "30px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightElement={
                  <Link
                    to="#"
                    style={{ textDecoration: "none", fontWeight: "600" }}
                  >
                    Forgot?
                  </Link>
                }
              />
              <MaterialButton
                title="Login"
                bgColor="#fb641b"
                textColor="#ffffff"
                fontWeight="600"
                style={{
                  marginBottom: "20px",
                }}
                onClick={onLogin}
              />
              <p style={{ color: "gray" }}>OR</p>
              <MaterialButton
                title="Request for OTP"
                bgColor="#ffffff"
                textColor="#2874f0"
                fontWeight="600"
                style={{
                  marginTop: "10px",
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        <div className="logo">
          <Link style={{ textDecoration: "none" }} to="#">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </Link>
          <Link style={{ marginTop: "-10px", textDecoration: "none" }} to="#">
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </Link>
        </div>
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={"search for products, brands and more"}
            />
            <div className="searchIconContainer">
              <IoIosSearch
                style={{
                  color: "#2874f0",
                }}
              />
            </div>
          </div>
        </div>
        <div className="rightMenu">
          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}

          <DropdownMenu
            menu={
              <Link
                to="#"
                className="more"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <span>More</span>
                <IoIosArrowDown />
              </Link>
            }
            menus={[
              { label: "Notification Preference", to: "", icon: null },
              { label: "Sell on flipkart", to: "", icon: null },
              { label: "24x7 Customer Care", to: "", icon: null },
              { label: "Advertise", to: "", icon: null },
              { label: "Download App", to: "", icon: null },
            ]}
          />
          <div>
            <Link
              to="#"
              className="cart"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <IoIosCart />
              <span
                style={{
                  margin: "0 10px",
                }}
              >
                Cart
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
