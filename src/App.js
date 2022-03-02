import Signup from "./components/Signup/Signup";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/100ms/Dashboard";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Userinfo from "./components/Userinfo";
import { HMSRoomProvider } from "@100mslive/hms-video-react";

function App() {
  return (
    <>
      <Router>
        <HMSRoomProvider>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/userinfo" element={<Userinfo />} />
              <Route exact path="/room/dashboard" element={<Dashboard />} />
            </Routes>
          </AuthProvider>
        </HMSRoomProvider>
      </Router>
    </>
  );
}

export default App;
