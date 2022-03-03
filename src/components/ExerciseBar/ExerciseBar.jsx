import React from "react";
import { WebData } from "../../data/WebData";
import { Link } from "react-router-dom"

function ExerciseBar(props) {
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 0,
      }}
    >
      <div
        className="exercise-wrapper"
        style={{ width: "calc(100vw - 1280px)" }}
      >
        <div className="exercise-inner w-100">
          <ul
            style={{
              listStyle: "none",
              paddingLeft: "0",
            }}
          >
            {WebData.moreThan40.day1.exercise.map((item, index) => {
              return (
                <li
                  style={{
                    color:
                      props.curIndex === index
                        ? "var(--bg-color)"
                        : "var(--main-color)",
                    borderRadius: "var(--roundness)",
                    paddingBlock: "20px",
                    paddingInline: "10px",
                    width: "100%",
                    background:
                      props.curIndex === index ? "var(--main-color)" : "",
                  }}
                >
                  {item.name}
                </li>
              );
            })}
            <Link to="/" style={{ textDecoration: "none" }}>
              <li
                style={{
                  color: "var(--bg-color)",
                  borderRadius: "var(--roundness)",
                  paddingBlock: "20px",
                  paddingInline: "10px",
                  width: "100%",
                  background: "var(--main-color)"
                }}
              >
                End Session
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ExerciseBar;
