import React, { useState } from "react";
import "./Friends.css";
import Fire from "../assets/Fire.png";
import { IoMdAddCircle } from "react-icons/io";
import { MdVerified } from "react-icons/md";

const Friends = ({
  friend_name,
  friend_profile,
  friend_streak,
  RightBar,
  search,
}) => {
  const [addFriend, setAddFriend] = useState(false);
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
          {friend_streak} Day Streak
          <img
            alt=""
            src={Fire}
            style={{ height: 30, width: "auto", marginLeft: 20 }}
          />
        </p>
      )}
      {search && !addFriend && (
        <IoMdAddCircle
          className="add-friend-icon"
          onClick={() => setAddFriend(true)}
        />
      )}
      {search && addFriend && (
        <MdVerified className="add-friend-icon tick-icon" />
      )}
    </div>
  );
};

export default Friends;
