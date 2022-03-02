import { useRef, useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { squats, pushUps } from "./ExercisesComponent";
import "../styles/camerarenderer.css";
import { Camera } from "@mediapipe/camera_utils";
import { Pose } from "@mediapipe/pose";
import { WebData } from "../data/WebData";
import { useExercise } from "../context/ExerciseContext";

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

let data = {
  count: 0,
  ind: 0,
  reps: 5,
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

const CameraRenderer = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const context = useExercise();
  const { exercises, setExercisesFor7Days } = context;
  const [curIndex, setCurIndex] = useState(0);
  const [reps, setReps] = useState(5);
  useEffect(() => {
    setExercisesFor7Days();
  }, []);
  useEffect(() => {
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
    if (exercises[curIndex].name === "Squats") {
      squats(results.poseLandmarks, data);
      setReps(exercises[curIndex].reps);
    } else if (exercises[curIndex].name === "Push Ups") {
      pushUps(results.poseLandmarks, data);
      setReps(exercises[curIndex].reps);
    } else if (exercises[curIndex].name === "Neck Rotation") {
      pushUps(results.poseLandmarks, data);
      setReps(exercises[curIndex].reps);
    }
    setReps(exercises[curIndex].reps - data.count);
    if (data.reps <= 0) {
      setCurIndex(curIndex + 1);
      data.ind++;
      console.log("changed", data.ind, reps);
      return;
      // setReps(exercises[curIndex].reps);
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
        j > 10
      ) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(point1.x * 1280, point1.y * 720);
        canvasCtx.lineTo(point2.x * 1280, point2.y * 720);
        canvasCtx.stroke();
      }
    });
    // canvasCtx.font = "32px Arial";
    // canvasCtx.fillStyle = "#ffcb10";
    // canvasCtx.fillText(`Count = ${data.count}`, 50, 50);
    canvasCtx.restore();
  }

  const ExerciseBar = () => {
    return;
    <></>;
  };

  const CountBar = () => {
    return (
      <div className="count-wrapper">
        <div className="cout-inner">
          <div className="count">{`Reps : ${reps}`}</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <video ref={videoRef}></video>
      <canvas ref={canvasRef} width={"1280px"} height={"720px"}></canvas>
      <CountBar />
    </div>
  );
};
export default CameraRenderer;
