import { useRef, useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { squats, pushUps, neck_rotation } from "./ExercisesComponent";
import "../styles/camerarenderer.css";
import { Camera } from "@mediapipe/camera_utils";
import { Pose } from "@mediapipe/pose";
import { WebData } from "../data/WebData";
import { useExercise } from "../context/ExerciseContext";
import ExerciseBar from "./ExerciseBar/ExerciseBar";

const pose = new Pose({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
  },
});

pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: true,
  smoothSegmentation: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
  selfieMode: true,
});

const connectorColor = "white";

var data = {
  count: 0,
  ind: 0,
  reps: 1,
};

const connections = [
  [0, 1],
  [0, 4],
  [1, 2],
  [2, 3],
  [3, 7],
  [4, 5],
  [5, 6],
  [6, 8],
  [9, 10],
  [11, 12],
  [11, 13],
  [11, 23],
  [12, 14],
  [14, 16],
  [12, 24],
  [13, 15],
  [15, 17],
  [16, 18],
  [16, 20],
  [15, 17],
  [15, 19],
  [15, 21],
  [16, 22],
  [17, 19],
  [18, 20],
  [23, 25],
  [23, 24],
  [24, 26],
  [25, 27],
  [26, 28],
  [27, 29],
  [28, 30],
  [27, 31],
  [28, 32],
  [29, 31],
  [30, 32],
];

const CameraRenderer = ({ videoCall }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const context = useExercise();
  const { setExercisesFor7Days } = context;
  const exercises = WebData.moreThan40.day1.exercise;
  const [reps, setReps] = useState(exercises[data.ind].reps);
  const [currIndex, setCurrIndex] = useState(data.ind);

  useEffect(() => {
    if (data.reps <= 0) {
      data.ind++;
      setCurrIndex(data.ind);
      data.reps = exercises[data.ind].reps;
      setReps(data.reps);
      console.log(currIndex);
    }
    console.log("reps changed", reps);
  }, [reps]);
  useEffect(() => {
    data.reps = exercises[currIndex].reps;
    pose.onResults(onResults);
    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await pose.send({ image: videoRef.current });
      },
      width: 1280,
      height: 720,
    });
    camera.start();
  }, []);

  function onResults(results) {
    if (!results.poseLandmarks) {
      return;
    }
    if (exercises[currIndex].name === "Squats") {
      data.reps = exercises[currIndex].reps;
      squats(results.poseLandmarks, data, setReps);
    } else if (exercises[currIndex].name === "Push Ups") {
      data.reps = exercises[currIndex].reps;
      pushUps(results.poseLandmarks, data, setReps);
    } else if (exercises[currIndex].name === "Neck Rotation") {
      data.reps = exercises[currIndex].reps;
      console.log("neck");
      neck_rotation(results.poseLandmarks, data, setReps);
    }

    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    canvasCtx.globalCompositeOperation = "source-in";
    canvasCtx.fillStyle = "#00FF00";
    canvasCtx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    canvasCtx.globalCompositeOperation = "destination-atop";
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    canvasCtx.globalCompositeOperation = "source-over";

    canvasCtx.fillStyle = connectorColor;
    canvasCtx.strokeStyle = connectorColor;
    canvasCtx.lineWidth = window.innerWidth >= 768 ? 6 : 2;

    connections.forEach(([i, j]) => {
      const point1 = results.poseLandmarks[i];
      const point2 = results.poseLandmarks[j];

      const score1 = point1.visibility != null ? point1.visibility : 1;
      const score2 = point2.visibility != null ? point2.visibility : 1;
      const scoreThreshold = 0;

      if (
        score1 >= scoreThreshold &&
        score2 >= scoreThreshold &&
        i > 10 &&
        j > 10 &&
        !videoCall
      ) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(point1.x * 1280, point1.y * 720);
        canvasCtx.lineTo(point2.x * 1280, point2.y * 720);
        canvasCtx.stroke();
      }
      if (
        score1 >= scoreThreshold &&
        score2 >= scoreThreshold &&
        i > 10 &&
        j > 10 &&
        videoCall
      ) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(point1.x * 900, point1.y * 600);
        canvasCtx.lineTo(point2.x * 900, point2.y * 600);
        canvasCtx.stroke();
      }
    });
    // canvasCtx.font = "32px Arial";
    // canvasCtx.fillStyle = "#ffcb10";
    // canvasCtx.fillText(`Count = ${data.count}`, 50, 50);
    canvasCtx.restore();
  }

  const CountBar = () => {
    return (
      <div
        className="count-wrapper"
        style={{ borderRadius: "var(--roundness)" }}
      >
        <div className="cout-inner">
          <div className="count">{`Reps : ${reps}`}</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <video ref={videoRef} style={{ display: "none" }}></video>
      <canvas
        ref={canvasRef}
        width={!videoCall ? "1280px" : "900px"}
        height={!videoCall ? "720px" : "600px"}
        style={{ borderRadius: "var(--roundness)" }}
      ></canvas>
      <CountBar />
      {!videoCall && <ExerciseBar curIndex={data.ind} />}
    </div>
  );
};
export default CameraRenderer;
