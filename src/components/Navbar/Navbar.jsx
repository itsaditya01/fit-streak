import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({});
  const { currentUser } = useAuth();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: currentUser.email,
          }),
        });
        const data = await response.json();
        console.log(data);
        setUserdata(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <span style={{ cursor: "pointer" }}>Fit Streak</span>
          </div>
          <div
            className="user-icon"
            style={{ cursor: "pointer", position: "relative" }}
          >
            <FaUserAlt className="user-icon" />
            <div className="menu">
              <div className="name">{userdata.username}</div>
              <div className="email">{userdata.email}</div>
              <div className="email">{`Age : ${userdata.age}`}</div>
              <div className="email">
                {`BMI : ${parseInt(
                  userdata.weight /
                  ((userdata.height * userdata.height) / 10000)
                )}`}
              </div>
              <Link className="logout" onClick={handleLogout} to="/login">
                Logout
                <HiOutlineLogout style={{ marginLeft: 3 }} />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <hr style={{ color: "white" }} />
    </div>
  );
}

export default Navbar;
