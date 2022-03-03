import {
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  useHMSActions,
  selectPeers,
  useHMSStore,
} from "@100mslive/hms-video-react";
import { useNavigate } from "react-router-dom";
import Peer from "./Peer";

function Conference() {
  const peers = useHMSStore(selectPeers);
  const videoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const audioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const hmsActions = useHMSActions();
  const navigate = useNavigate();

  const toggleAudio = () => {
    hmsActions.setLocalAudioEnabled(!audioEnabled);
  };

  const toggleVideo = () => {
    hmsActions.setLocalVideoEnabled(!videoEnabled);
  };

  // if(peers.length > 2)
  // {
  //     return null
  // }

  return (
    <>
      {/* <h2>Conference</h2> */}
      <div
        className="df ac jcc"
        style={{ position: "fixed", inset: 0, overflowY: "auto" }}
      >
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
        <div
          className="control-bar"
          style={{ position: "absolute", bottom: 20 }}
        >
          <button
            className="btn-control"
            onClick={toggleAudio}
            style={{ padding: 10, marginRight: 20 }}
          >
            {audioEnabled ? "Mute" : "Unmute"}
          </button>
          <button
            className="btn-control"
            onClick={toggleVideo}
            style={{ padding: 10, marginRight: 20 }}
          >
            {videoEnabled ? "Hide" : "Unhide"}
          </button>
          <button
            style={{ padding: 10 }}
            onClick={() => {
              hmsActions.leave();
              navigate("/");
            }}
          >
            Leave
          </button>
        </div>
      </div>
    </>
  );
}

export default Conference;
