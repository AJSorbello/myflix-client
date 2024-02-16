import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";
import logo from "../../belloflix_logo_200x70.png";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme;
    document.documentElement.dataset.bsTheme = theme;
  }, [theme]);

  return (
    <Navbar
      bg={theme === "light" ? "light" : "dark"}
      variant={theme === "light" ? "light" : "dark"}
      expand="lg"
      fixed="top"
      onClick={() => window.scrollTo(0, 0)}>
      <Container>
        <Navbar.Brand>
          <img
            src={logo}
            width="200"
            height="70"
            className="d-inline-block align-top"
            alt="Belloflix Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          bg={theme === "light" ? "light" : "dark"} // Set background color of toggle button
          icon={
            theme === "light" ? (
              <CustomLightToggleIcon />
            ) : (
              <CustomDarkToggleIcon />
            )
          } // Custom icon based on theme
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  All Movies
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={() => onLoggedOut()} as={Link} to="/">
                  Logout
                </Nav.Link>
              </>
            )}
            <Form.Check
              type="switch"
              id="custom-switch"
              label={theme === "light" ? "Light" : "Dark"}
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Custom toggle icon for light mode
const CustomLightToggleIcon = () => (
  <span className="navbar-light-mode-toggle-icon">&#8801;</span>
);

// Custom toggle icon for dark mode
const CustomDarkToggleIcon = () => (
  <span className="navbar-dark-mode-toggle-icon">&#8801;</span>
);
