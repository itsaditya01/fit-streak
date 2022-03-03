import React, { useState, useEffect, useRef } from "react";
import "./RightBar.css";
// import Request from "../Requests/Request";
import Friends from "../Friends/Friends";
import Friend1 from "./people5.jpg";
import Friend2 from "../assets/people1.jpg";
import Friend3 from "../assets/people2.jpg";
import Friend4 from "../assets/people3.jpeg";
import { useAuth } from "../context/AuthContext"
const RightBar = () => {

  const { currentUser } = useAuth()
  const [friend_profile, setFriend_profile] = useState(null);
  const [own_profile, setOwn_profile] = useState({});
  useEffect(() => {
    const owndata = async () => {
      const response = await fetch(`http://localhost:5000/api/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: currentUser.email
        })
      })
      const data = await response.json();
      setOwn_profile(data);
    }
    owndata();
  }, [])
  const friendusername = useRef()
  const frienddata = async () => {
    const response = await fetch(`http://localhost:5000/api/searchfriend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: friendusername.current.value
      })
    })
    const data = await response.json();
    setFriend_profile(data);
  }


  return (
    <>
      <div className="rightbar df ac fdc">
        <div className="friends-list">
          <p className="rightbar-heading"> FRIENDS</p>
          <div className="search-bar" style={{ display: "flex", flexDirection: "row", marginBottom: "25px", }}>
            <input type="text" ref={friendusername} id="search" placeholder="Search Friends" style={{ color: "white", marginRight: "5px", padding: '5px', fontSize: 14 }}></input>
            <button type="submit" id="search-btn" style={{ padding: "0px 3px", fontSize: 13 }} onClick={frienddata}>Search</button>
          </div>
          {friend_profile !== null ? <Friends
            friend_name={friend_profile.username}
            friend_profile={Friend1}
            RightBar={true}
          /> : null}
        </div>
      </div>
    </>
  );
};

export default RightBar;
