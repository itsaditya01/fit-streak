import React from "react";
import { WebData } from "../../data/WebData";

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
          <ul style={{ listStyle: "none", paddingLeft: "0" }}>
            {WebData.moreThan40.day1.exercise.map((item, index) => {
              return (
                <li
                  style={{
                    color:
                      props.curIndex === index
                        ? "var(--bg-color)"
                        : "var(--main-color)",
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
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ExerciseBar;
