import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Userinfo = () => {
    const usernameRef = useRef();
    const heightRef = useRef();
    const weightRef = useRef();
    const ageRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            const response = await fetch('http://localhost:5000/api/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    email: currentUser.email,
                    height: heightRef.current.value,
                    weight: weightRef.current.value,
                    age: ageRef.current.value
                })
            });
            const data = await response.json();
            navigate('/');
        }
        catch (error) {
            setError("Failed to get Data");
        }
        setLoading(false);
    }

    return (
        <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
            <div className='w-100' style={{ maxWidth: '400px' }}>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>User Info</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type='text' ref={usernameRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="height">
                                <Form.Label>height (centimeters)</Form.Label>
                                <Form.Control type='number' ref={heightRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="weight">
                                <Form.Label>Weight (Kilograms)</Form.Label>
                                <Form.Control type='number' ref={weightRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type='number' ref={ageRef} required></Form.Control>
                            </Form.Group>
                            <Button disabled={loading} className='w-100 my-3' type='submit'>Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container >
    )
}

export default Userinfo