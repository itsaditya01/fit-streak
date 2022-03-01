import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CameraRenderer from "./CameraRenderer";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [state, setState] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button className="start-btn" onClick={() => setState(!state)}>
        {state === false ? "Start" : "Stop"}
      </button>
      {state === true && <CameraRenderer />}
      {/* <Link to="/login" onClick={handleLogout}>
        Log Out
      </Link> */}
    </div>
  );
};

export default Dashboard;
