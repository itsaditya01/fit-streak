import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (e) {
      setError("Failed to Login");
    }
    setLoading(false);
  };

  return (
    <>
      <div>
        <div
          style={{
            borderRadius: "1rem",
            borderRadius: "1rem",
            border: "1px solid white",
            padding: 16,
          }}
        >
          <h2 className="text-center mb-4" style={{ color: "white" }}>
            Log In
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
            <Button
              disabled={loading}
              className="w-100 my-3"
              type="submit"
              style={{
                background: "var(--main-color)",
                border: "none",
                outline: "none",
                color: "white",
                fontWeight: 600,
                fontSize: 22,
              }}
            >
              Log In
            </Button>
          </Form>
        </div>
      </div>
      <div className="w-100 text-center mt-2" style={{ color: "white" }}>
        Need an account?{" "}
        <Link
          to="/signup"
          style={{ textDecoration: "none", color: "var(--main-color)" }}
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default Login;
