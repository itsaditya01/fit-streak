import React from 'react';
import Signup from './components/Signup';
import AuthProvider from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Userinfo from './components/Userinfo';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/userinfo" element={<Userinfo />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;