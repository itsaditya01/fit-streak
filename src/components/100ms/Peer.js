import {
  useHMSActions,
  useHMSStore,
  selectVideoTrackByPeerID,
} from "@100mslive/hms-video-react";
import { useRef, useEffect } from "react";
import Footer from "./Footer";

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

  // console.log(peer)
  // console.log(peer.name, peer.isLocal, videoRef, videoTrack)
  // if(trainer)
  // {
  //   return (
  //     !liveScreencall ? (
  //       peer.isLocal ? (null) : (
  //         <div className={window.innerWidth < 576 && "jcc"} style = {{ display: 'flex', flexDirection: window.innerWidth > 576 && 'column', height: window.innerWidth >= 768 ? window.innerHeight - 100 : window.innerWidth > 576 ? window.innerWidth - 84 : window.innerHeight - 250, position: 'relative' }}>
  //           <video
  //           style={{
  //             height: window.innerWidth > 576 ? 'auto': window.innerHeight - 250,
  //             width: window.innerWidth > 576 && '100%'
  //           }}
  //           ref = { videoRef }
  //           className={`peer-video`}
  //           autoPlay
  //           muted
  //           playsInline/>

  //         </div>
  //       )
  //     ) : (
  //       peer.isLocal ? (
  //         <div style={window.innerWidth <= 576 ? {display: 'flex', alignItems: 'center', flexDirection: 'column'} : {}}>
  //           <video
  //             style = { liveScreencall ? {
  //               width: "auto",
  //               height: window.innerWidth > 576 ? window.innerHeight / 2 - 50 : 120,
  //               maxWidth: window.innerWidth < 576 && 150,
  //             } : {
  //               width: "auto",
  //               maxWidth: 462,
  //               height: window.innerHeight / 2 - 10,
  //               maxHeight: 300
  //             }
  //           }
  //           ref = { videoRef }
  //           className={`peer-video ${peer.isLocal ? "local" : ""}`}
  //           autoPlay
  //           muted
  //           playsInline
  //           />
  //           <div style={{ fontSize: 12, color: "white" }}>
  //             {peer.name} {peer.isLocal ? "(You)" : ""}
  //           </div>
  //         </div>
  //       ) : null
  //     )
  //   )
  // }

  return (
    <div
      style={
        window.innerWidth <= 576
          ? { display: "flex", alignItems: "center", flexDirection: "column" }
          : {}
      }
    >
      <video
        style={
          liveScreencall
            ? {
                width: "auto",
                height:
                  window.innerWidth > 576 ? window.innerHeight / 2 - 50 : 120,
                maxWidth: window.innerWidth < 576 && 150,
              }
            : {
                width: "auto",
                maxWidth: 462,
                height: window.innerHeight / 2 - 10,
                maxHeight: 300,
              }
        }
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
      />
      <div style={{ fontSize: 12, color: "white" }}>
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}

export default Peer;
