import React from "react";
import "./RightBar.css";
// import Request from "../Requests/Request";
import Friends from "../Friends/Friends";
import Friend1 from "./people5.jpg";
import Friend2 from "../assets/people1.jpg";
import Friend3 from "../assets/people2.jpg";
import Friend4 from "../assets/people3.jpeg";
const RightBar = () => {
  return (
    <>
      <div className="rightbar df ac fdc">
        <div className="friends-list">
          <p className="rightbar-heading"> FRIENDS</p>
          <Friends
            friend_name="Laura Fisher"
            friend_profile={Friend1}
            RightBar={true}
          />
          <Friends
            friend_name="Sam Smith"
            friend_profile={Friend2}
            RightBar={true}
          />
          <Friends
            friend_name=" Monkey D Luffy"
            friend_profile={Friend3}
            RightBar={true}
          />
          <Friends
            friend_name="Nami"
            friend_profile={Friend4}
            RightBar={true}
          />
        </div>
      </div>
    </>
  );
};

export default RightBar;
