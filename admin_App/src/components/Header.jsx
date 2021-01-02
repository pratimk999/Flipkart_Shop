import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions";
import { IoLogoTux } from "react-icons/io";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import { RiUserShared2Fill } from "react-icons/ri";
function Header() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(signout());
  };
  const renderLoggedInUser = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span
            className="nav-link"
            onClick={logOut}
            style={{ cursor: "pointer", color: "white" }}
          >
            <RiUserShared2Fill style={{ fontSize: "20px" }} />
            <span style={{ marginLeft: "3px" }}>SignOut</span>
          </span>
        </li>
      </Nav>
    );
  };

  const renderNotLoggedInUser = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link" style={{ color: "white" }}>
            <FaUserCheck style={{ fontSize: "20px" }} />
            <span style={{ marginLeft: "3px" }}>SignIn</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link" style={{ color: "white" }}>
            <FaUserPlus style={{ fontSize: "20px" }} />
            <span style={{ marginLeft: "3px" }}>SignUp</span>
          </NavLink>
        </li>
      </Nav>
    );
  };
  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="lg"
      bg="primary"
      variant="primary"
      style={{ zIndex: "1", color: "white" }}
    >
      <Container>
        <Link className="navbar-brand" to="/" style={{ color: "white" }}>
          <IoLogoTux style={{ fontSize: "30px" }} />
          <span style={{ marginLeft: "3px" }}>Admin Dashboard</span>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {auth.authenticate ? renderLoggedInUser() : renderNotLoggedInUser()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
