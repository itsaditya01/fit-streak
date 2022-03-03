import React from "react";
import "./Navbar.css";
import { FaUserAlt } from "react-icons/fa";

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <span style={{ cursor: "pointer" }}>Fit Streak</span>
          </div>
          <div className="user-icon">
            <FaUserAlt style={{ width: "100%", padding: "0px" }} />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
