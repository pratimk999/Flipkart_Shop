import React, { useState } from "react";
import flipkartLogo from "../images/logo/flipkart.PNG";
import goldenStar from "../images/logo/golden-star.PNG";
import "../styling/header.css";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../components/MaterialUi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { login, signout, getCartItems, signup as _signup } from "../actions";

function Header(props) {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  //NOTE state cart value
  const cart = useSelector((state) => state.cart);

  const userSignup = () => {
    const user = {
      firstName,
      lastName,
      email,
      password,
      mobileNumber,
    };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      mobileNumber === ""
    ) {
      alert("You have to fill all the details");
      setSignup(false);
      setLoginModal(false);
      return;
    }

    dispatch(_signup(user));
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setMobileNumber("");
    setSignup(false);
  };

  const userLogin = () => {
    if (signup) {
      userSignup();
    } else {
      if (email === "" || password === "") {
        alert("You have to fill all the details");
        setLoginModal(false);
        return;
      }
      dispatch(login({ email, password }));
      setEmail("");
      setPassword("");
      setLoginModal(false);
    }
  };

  const logOut = () => {
    dispatch(signout());
    setEmail("");
    setPassword("");
  };

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
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
          },
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
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
            style={{ textDecoration: "none" }}
          >
            Login
          </Link>
        }
        menus={[
          { label: "My Profile", to: "", icon: null },
          { label: "SuperCoin Zone", to: "", icon: null },
          { label: "Flipkart Plus Zone", to: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              !auth.authenticate && setLoginModal(true);
            },
          },
          { label: "Wishlist", to: "", icon: null },
          { label: "Rewards", to: "", icon: null },
          { label: "Gift Cards", to: "", icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <Link
              style={{ color: "#2874f0", textDecoration: "none" }}
              to="#"
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
            >
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
              {signup ? <h2>Register</h2> : <h2>Login</h2>}
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <div className="loginInputContainer">
                {auth.error && (
                  <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                )}

                <MaterialInput
                  type="text"
                  label="Email"
                  value={email}
                  style={{ marginBottom: "20px" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Mobile Number"
                    value={mobileNumber}
                    style={{ marginBottom: "20px" }}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                )}
                <MaterialInput
                  type="password"
                  label="Password"
                  value={password}
                  style={{ marginTop: "10px", marginBottom: "30px" }}
                  onChange={(e) => setPassword(e.target.value)}
                  // rightElement={<a href="#">Forgot?</a>}
                />
                <MaterialButton
                  title={signup ? "Register" : "Login"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    margin: "40px 0 20px 0",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                  onClick={userLogin}
                />
                <p style={{ textAlign: "center" }}>OR</p>
                <MaterialButton
                  title="Request OTP"
                  bgColor="#ffffff"
                  textColor="#2874f0"
                  style={{
                    margin: "20px 0",
                  }}
                />
              </div>
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
              to={`/cart`}
              className="cart"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <Cart count={Object.keys(cart.cartItems).length} />
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
}

export default Header;
