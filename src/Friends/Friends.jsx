import React from "react";
import "./Friends.css";
import Fire from "../assets/Fire.png";

const Friends = ({ friend_name, friend_profile, friend_streak, RightBar }) => {
  return (
    <div className="friend df ac">
      <img
        src={friend_profile}
        alt="friend"
        width="45px"
        height="45px"
        className="friend-img"
      />
      <p className="friend-name">{friend_name}</p>
      {!RightBar && (
        <p className="friend-streak">
          {friend_streak} Day Streak{" "}
          <img
            src={Fire}
            style={{ height: 30, width: "auto", marginLeft: 20 }}
          />
        </p>
      )}
    </div>
  );
};

export default Friends;
