import { WebData } from "../../data/WebData";
import Fire from "../../assets/Fire.png";
import RightBar from "../../RightSideBar/RightBar";
import "./hero.css";
import Friends from "../../Friends/Friends";
import Friend1 from "../../assets/people1.jpg";
import Friend2 from "../../assets/people2.jpg";
import Friend3 from "../../assets/people3.jpeg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="main-hero">
      <div className="left-hero">
        <div className="daily-goal">
          <h1 style={{ color: "var(--main-color)" }}>
            Here are your daily goals
          </h1>
          <ul>
            {WebData.lessThan40.day1.exercise.map((val) => (
              <li
                style={{ color: "white" }}
              >{`${val.name} ${val.reps} Reps and ${val.sets} Set`}</li>
            ))}
          </ul>
          <div className="streak-div">
            <h1 style={{ color: "white" }}>3 Day Streak</h1>
            <img
              src={Fire}
              alt="Streak"
              style={{ height: "auto", width: 50 }}
            />
          </div>
          <p style={{ color: "white" }}>
            Complete the daily exercises and flex in front of your friends
          </p>
          <div className="btn-div">
            <button className="start-btn">Start Grinding</button>
            <button
              className="room-btn"
              onClick={() => navigate("/room/dashboard")}
            >
              Join your friends
            </button>
          </div>
        </div>
        <div className="friend-acheivments">
          <h2 style={{ color: "var(--main-color)" }}>
            These friends are on a journey of self improvement
          </h2>
          <Friends
            friend_name="Laura Fisher"
            friend_profile={Friend1}
            friend_streak={2}
          />
          <Friends
            friend_name="Sam Smith"
            friend_profile={Friend2}
            friend_streak={7}
          />
          <Friends
            friend_name=" Monkey D Luffy"
            friend_profile={Friend3}
            friend_streak={17}
          />
        </div>
      </div>
      <div className="right-hero">
        <RightBar />
      </div>
    </div>
  );
};

export default Hero;
