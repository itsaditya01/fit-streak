import CameraRenderer from "./components/CameraRenderer";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [state, setState] = useState(false);
  return (
    <>
      <button onClick={() => setState(!state)}>
        {state === false ? "Start" : "Stop"}
      </button>
      {state === true && <CameraRenderer />}
    </>
  );
}

export default App;
