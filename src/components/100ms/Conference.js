import { selectPeers, useHMSStore } from "@100mslive/hms-video-react";
import Peer from "./Peer";

function Conference() {
  const peers = useHMSStore(selectPeers);

  // if(peers.length > 2)
  // {
  //     return null
  // }

  return (
    <>
      {/* <h2>Conference</h2> */}
      <div>
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </div>
    </>
  );
}

export default Conference;
