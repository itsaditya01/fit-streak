import "./hero.css";

const Hero = () => {
  return (
    <div className="main-hero">
      <div className="left-hero">
        <div className="daily-goal">
          <h1 style={{ color: "var(--main-color)" }}>
            Here are your daily goals
          </h1>
          <p style={{ color: "white" }}>
            Complete the daily exercises and flex in front of your friends
          </p>
          <div className="btn-div">
            <button className="start-btn">Start Grinding</button>
            <button className="room-btn">Join your friends</button>
          </div>
        </div>
        <div className="friend-acheivments"></div>
      </div>
      <div className="right-hero">Hello</div>
    </div>
  );
};

export default Hero;
