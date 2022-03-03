import {
  useHMSActions,
  useHMSStore,
  selectVideoTrackByPeerID,
} from "@100mslive/hms-video-react";
import { useRef, useEffect } from "react";

function Peer({ peer }) {
  // console.log(peer)
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  const videoTrack = useHMSStore(selectVideoTrackByPeerID(peer.id));

  useEffect(() => {
    if (videoRef.current && videoTrack) {
      if (videoTrack.enabled) {
        hmsActions.attachVideo(videoTrack.id, videoRef.current);
      } else {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    }
  }, [videoTrack, hmsActions, videoRef.current]);

  return (
    <div
    // style={
    //   window.innerWidth <= 576
    //     ? { display: "flex", alignItems: "center", flexDirection: "column" }
    //     : {}
    // }
    >
      <video
        style={
          {
            width: "auto",
            height: peer.isLocal && 600,
            maxWidth: peer.isLocal ? 1000 : 400,
            borderRadius: "var(--roundness)",
            marginLeft: 40,
          }
          // : {
          //     width: "auto",
          //     maxWidth: 462,
          //     height: window.innerHeight / 2 - 10,
          //     maxHeight: 300,
          //   }
        }
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
      />
      <div style={{ fontSize: 12, color: "white", marginLeft: 40 }}>
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}

export default Peer;
