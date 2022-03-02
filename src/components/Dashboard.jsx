import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navbar, Container, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const [userdata, setUserdata] = useState({})
    const { currentUser } = useAuth();
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigate('/login');
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/getuser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: currentUser.email
                    })
                });
                const data = await response.json();
                console.log(data);
                setUserdata(data);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData()
    }, []);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>Welcome {userdata.username} to Fit Streak</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <NavDropdown title="Profile" id="basic-nav-dropdown" variant="dark">
                        <NavDropdown.ItemText><b>Email:</b> {userdata.email}</NavDropdown.ItemText>
                        <NavDropdown.ItemText><b>Age:</b> {userdata.age}</NavDropdown.ItemText>
                        <NavDropdown.ItemText><b>BMI:</b> {parseInt(userdata.weight / ((userdata.height * userdata.height) / 10000))}</NavDropdown.ItemText>
                        <NavDropdown.Divider />
                        <NavDropdown.Item variant="link" onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Dashboard