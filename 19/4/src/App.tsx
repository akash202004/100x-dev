import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setScoket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState<string>("");
  const [sendMessage, setSendMessage] = useState<string>("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("connected");
      setScoket(socket);
    };

    socket.onmessage = (e) => {
      console.log("Received Data: ", e.data);
      setLatestMessage(e.data);
    };

    return () => {
      socket.close();
    };
  });

  const handleSendMessage = () => {
    if (!socket) {
      console.log("Socket is not connected");
      return;
    }
    socket.send(sendMessage);
    setSendMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!socket) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <>
      <h1>WebSocket Chat</h1>
      <p>Data: {latestMessage}</p>
      <input
        type="text"
        placeholder="Type your message"
        value={sendMessage}
        onKeyDown={handleKeyDown}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSendMessage(e.target.value)
        }
      />
      <button onClick={handleSendMessage}>Send</button>
    </>
  );
}

export default App;
