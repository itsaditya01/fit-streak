import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {

    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <Link to="/login" onClick={handleLogout}>Log Out</Link>
        </div>
    )
}

export default Dashboard