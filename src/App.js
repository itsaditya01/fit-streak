<<<<<<< HEAD
import React from 'react';
import Signup from './components/Signup';
import AuthProvider from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Userinfo from './components/Userinfo';
=======
import Signup from "./components/Signup/Signup";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
>>>>>>> 54d1a576af9101b9e2c8a3181d9496a911f1188a

function App() {
  return (
    <>
<<<<<<< HEAD
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
=======
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
>>>>>>> 54d1a576af9101b9e2c8a3181d9496a911f1188a
    </>
  );
}

export default App;
