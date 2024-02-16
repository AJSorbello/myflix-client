import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
// import Alert from "react-bootstrap/Alert";

export const SignupView = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // setLoading(true);
    // setError(null);
    // Calculate age
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Check age restriction
    if (age < 13) {
      alert("You must be at least 13 years old to sign up.");
      return;
    }

    const data = {
      Fullname: fullName,
      Username: username,
      Email: email,
      Password: password,
      Birthday: birthday,
    };

    fetch("https://ajmovies-fc7e7627ec3d.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        alert("Signup successful");
        navigate("/login"); // navigate to login page
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        alert("Signup failed");
      });
  };
  return (
    <Container className="main-content-custom">
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Title>Complete Form Below To Sign Up</Card.Title>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="signupformFullName">
                    <Form.Label>Full Name:</Form.Label>
                    <Form.Control
                      type="text"
                      aria-label="Full Name"
                      aria-required="true"
                      value={fullName}
                      placeholder="First & Last Name"
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="signupformUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      aria-label="Username"
                      aria-required="true"
                      value={username}
                      placeholder="Create Username"
                      minLength="6"
                      pattern="^[a-zA-Z0-9]+$"
                      title="Username can only contain letters and numbers"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="signupformPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Create Password"
                      aria-label="Password"
                      aria-required="true"
                      value={password}
                      minLength="8"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least one special character and 8 or more characters."
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="signupformEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      aria-label="Email"
                      aria-required="true"
                      value={email}
                      placeholder="Enter Your Email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="signupformBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      aria-label="Birthday"
                      aria-required="true"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <div>
                    <Button
                      className="signup-button mt-3"
                      variant="primary"
                      type="submit">
                      Sign Up
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};
