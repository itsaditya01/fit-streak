import React, { useRef, useState } from "react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
} from "@100mslive/hms-video-react";
import "./Dashboard.css";

const createRoomToken = async (name) => {
  const response = await fetch("https://prod-in2.100ms.live/api/v2/rooms", {
    method: "POST",
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3Nfa2V5IjoiNjIxZjU2MDE3YTlkMDRlMjhjNjBkYzUzIiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJpYXQiOjE2NDYyMjM2NzcsIm5iZiI6MTY0NjIyMzY3NywiZXhwIjoxNjQ2MzEwMDc3LCJqdGkiOiIyNzU4Njg1My05NjhjLTRiYTQtODI3Yy01YTBjMTAxMjllMzcifQ.B_tu6bq0HzA0Suc7Vf_Nlq53TCS4AsBSqob7m4uquFk",
      "Content-type": "application/json",
    },
    body: {
      name: `${name}`,
      description: "Group exercising room",
    },
  });
};

const joinRoomToken = () => {
  console.log("joined");
};

const Dashboard = () => {
  const [createRoom, setCreateRoom] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  const getToken = async () => {
    let response;
    response = await fetch(
      "https://prod-in.100ms.live/hmsapi/psa.app.100ms.live/api/token",
      {
        method: "POST",
        body: {
          user_id: inputVal.name,
          room_id: "621f578a7a9d04e28c60dc5b",
          role: "host",
        },
      }
    );
    // console.log("role: ", role, " authToken: ", response.data.token);
    hmsActions.join({
      userName: inputVal,
      authToken: response.data.token,
    });
  };
  return !isConnected ? (
    <div className="dash-main-div df ac jcc fdc">
      {createRoom === 0 && (
        <>
          {" "}
          <button
            onClick={() => {
              setCreateRoom(1);
            }}
            className="create-room"
          >
            Create Room
          </button>
          <h2 style={{ color: "white" }}>Or</h2>
          <button className="join-room" onClick={() => setCreateRoom(-1)}>
            Join Room
          </button>{" "}
        </>
      )}
      {createRoom === 1 && (
        <div style={{ height: "30vh" }} className="df ac sb fdc">
          <h1 style={{ color: "white" }}>Enter your nick name</h1>
          <input
            type="text"
            onChange={(e) => setInputVal(e.target.value)}
            value={inputVal}
            style={{ color: "#d1d0c5" }}
          />
          <button
            onClick={() => {
              createRoomToken(inputVal);
            }}
            className="create-btn"
          >
            Create
          </button>
        </div>
      )}
      {createRoom === -1 && (
        <div style={{ height: "30vh" }} className="df ac sb fdc">
          <h1 style={{ color: "white" }}>Enter your nick name</h1>
          <input
            type="text"
            onChange={(e) => setInputVal(e.target.value)}
            value={inputVal}
            style={{ color: "#d1d0c5" }}
          />
          <button
            onClick={() => {
              joinRoomToken(inputVal);
            }}
            className="create-room"
          >
            Join
          </button>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default Dashboard;
