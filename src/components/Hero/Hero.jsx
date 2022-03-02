import { WebData } from "../../data/WebData";
import Fire from "../../assets/Fire.png";
import "./hero.css";

const Hero = () => {
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
            <button className="room-btn">Join your friends</button>
          </div>
        </div>
        <div className="friend-acheivments">
          <h1 style={{ color: "var(--main-color)" }}>
            These friends are on a journey of self improvement
          </h1>
        </div>
      </div>
      <div className="right-hero">Hello</div>
    </div>
  );
};

export default Hero;
