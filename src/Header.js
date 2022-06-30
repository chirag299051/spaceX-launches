import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./index.css";
import { connect } from "react-redux";
import { logOut } from "./App";
import { Button } from "react-bootstrap";

const Header = ({ login, dispatch }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>SpaceX &emsp; Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <Button
            variant="dark"
            onClick={() => {
              console.log("login :", login);
              dispatch({ type: "HANDLE_LOGIN", data: !login });
            }}
          >
            {login ? "Logout" : "Login"}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (store) => {
  const { login, dispatch } = store;
  return { login, dispatch };
};

export default connect(mapStateToProps)(Header);
