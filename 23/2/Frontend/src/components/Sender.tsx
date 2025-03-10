import { useEffect, useState } from "react";

const Sender = () => {
  const [socket, setsocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "sender" }));
    };
  });

  async function startSendingVideo() {
    if (!socket) return;

    const pc = new RTCPeerConnection();
    const offer = await pc.createOffer();
    pc.setLocalDescription(offer);
    socket?.send(
      JSON.stringify({ type: "createOffer", sdp: pc.localDescription })
    );

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        pc.setRemoteDescription(data.sdp);
    };
  }

  return (
    <>
      <div>Sender</div>
      <button onClick={startSendingVideo}>Send Video</button>
    </>
  );
};

export { Sender };
