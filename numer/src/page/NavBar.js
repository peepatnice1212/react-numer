import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Helmet } from "react-helmet";

const NavBar = () => {
  return (
    <div>
      <Helmet>
        <style>
          {
            "#nav-dropdown-dark-example{ margin-right: 100px;}#home{margin-right: 100px;margin-left:50px;}}"
          }
        </style>
      </Helmet>
      <Navbar variant="dark" bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand id="home" href="/">
            Home
          </Navbar.Brand>
          <Navbar.Brand href="/sample">Sample</Navbar.Brand>
          <Navbar.Brand href="/test">Test</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Root of Equation"
                menuVariant="dark"
              >
                <NavDropdown.Item href="/bisection">
                  Bisection Method
                </NavDropdown.Item>
                <NavDropdown.Item href="/falsepo">
                  False Position Method
                </NavDropdown.Item>
                <NavDropdown.Item href="/onepoint">
                  One Point Iteration Method
                </NavDropdown.Item>
                <NavDropdown.Item href="/taylors">
                  Taylor Series
                </NavDropdown.Item>
                <NavDropdown.Item href="/newton">
                  Newton Raphson Method
                </NavDropdown.Item>
                <NavDropdown.Item href="/secant">
                  Secant Method
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Linear Algebra"
                menuVariant="dark"
              >
                <NavDropdown.Item href="/cramer">
                  Cramer's Rule
                </NavDropdown.Item>
                <NavDropdown.Item href="/gausselimination">
                  Gauss Elimination Method
                </NavDropdown.Item>
                <NavDropdown.Item href="/gaussjordan">
                  Gauss Jordan Method
                </NavDropdown.Item>
                <NavDropdown.Item href="/matrix_inversion">
                  Matrix Inversion Method
                </NavDropdown.Item>
                {/* <NavDropdown.Item href="/LU_decomposition">
                  LU Decomposition Method
                </NavDropdown.Item>
                <NavDropdown.Item href="">
                  Cholesky Decomposition Method
                </NavDropdown.Item>
                <NavDropdown.Item href="">
                  Jacobi Iteration Method
                </NavDropdown.Item>
                <NavDropdown.Item href="">Gauss Seidel Method</NavDropdown.Item>
                <NavDropdown.Item href="">
                  Conjugate Gradient Method
                </NavDropdown.Item> */}
              </NavDropdown>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Least Squares Regression"
                menuVariant="dark"
              >
                <NavDropdown.Item href="/Linear_Regression">
                  Linear Regression
                </NavDropdown.Item>
                <NavDropdown.Item href="/Polynomial_Regression">
                  Polynomial Regression
                </NavDropdown.Item>
                <NavDropdown.Item href="/Multiple_Linear_Regression">
                  Multiple Regression
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
