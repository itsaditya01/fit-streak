import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Userinfo = () => {
  const usernameRef = useRef();
  const heightRef = useRef();
  const weightRef = useRef();
  const ageRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          email: currentUser.email,
          height: heightRef.current.value,
          weight: weightRef.current.value,
          age: ageRef.current.value,
        }),
      });
      const data = await response.json();
      navigate("/");
    } catch (error) {
      setError("Failed to get Data");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflowY: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "var(--main)",
      }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card
          style={{
            borderRadius: "1rem",
            borderRadius: "1rem",
            border: "1px solid white",
            padding: 16,
            width: 400,
            background: "var(--main)",
          }}
        >
          <Card.Body style={{ color: "white" }}>
            <h2 className="text-center mb-4" style={{ color: "white" }}>
              User Info
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  ref={usernameRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group id="height">
                <Form.Label>height (centimeters)</Form.Label>
                <Form.Control
                  type="number"
                  ref={heightRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group id="weight">
                <Form.Label>Weight (Kilograms)</Form.Label>
                <Form.Control
                  type="number"
                  ref={weightRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group id="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  ref={ageRef}
                  required
                ></Form.Control>
              </Form.Group>
              <button
                disabled={loading}
                className="w-100 my-3"
                type="submit"
                style={{
                  textDecoration: "none",
                  backgroundColor: "var(--main-color)",
                  padding: "10px",
                }}
              >
                <h4 style={{ marginBottom: 0 }}>Submit</h4>
              </button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Userinfo;
