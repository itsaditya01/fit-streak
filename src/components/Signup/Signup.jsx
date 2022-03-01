import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setLoading(true);
      setError("");
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/login");
    } catch (error) {
      setError("Failed to Signup");
    }
    setLoading(false);
  };

  return (
    <>
      <>
        <div
          style={{
            borderRadius: "1rem",
            borderRadius: "1rem",
            border: "1px solid white",
            padding: 16,
          }}
        >
          <h2 className="text-center mb-4" style={{ color: "white" }}>
            Sign Up
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label style={{ color: "white" }}>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                style={{ background: "#d1d0c5" }}
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label style={{ color: "white" }}>Password</Form.Label>
              <Form.Control
                style={{ background: "#d1d0c5" }}
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label style={{ color: "white" }}>
                Password Confirmation
              </Form.Label>
              <Form.Control
                style={{ background: "#d1d0c5" }}
                type="password"
                ref={passwordConfirmRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100 my-3"
              type="submit"
              style={{
                color: "white",
                background: "var(--main-color)",
                outline: "none",
                border: "none",
                fontWeight: 600,
                fontSize: 22,
              }}
            >
              Sign Up
            </Button>
          </Form>
        </div>
      </>
      <div className="w-100 text-center mt-2" style={{ color: "white" }}>
        Already have an account?{" "}
        <Link
          to="/login"
          style={{ textDecoration: "none", color: "var(--main-color)" }}
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default Signup;
