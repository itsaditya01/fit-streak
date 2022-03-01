import React from "react";
import "./Navbar.css";
import { FaUserAlt } from "react-icons/fa";

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <span>Fit Streak</span>
          </div>
          <div className="user-icon">
            <FaUserAlt />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
