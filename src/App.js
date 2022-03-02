import Signup from "./components/Signup/Signup";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import ExerciseProvider from "./context/ExerciseContext";
import React from "react";
import Userinfo from "./components/Userinfo";
import { HMSRoomProvider } from "@100mslive/hms-video-react";

function App() {
  return (
    <>
      <div className="w-100">
        <Router>
          <HMSRoomProvider>
            <AuthProvider>
              <ExerciseProvider>
                <Routes>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route exact path="/signup" element={<Signup />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/userinfo" element={<Userinfo />} />
                </Routes>
              </ExerciseProvider>
            </AuthProvider>
          </HMSRoomProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
