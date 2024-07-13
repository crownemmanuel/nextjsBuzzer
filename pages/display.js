import { useState, useContext, useEffect, useRef } from "react";
import { SocketContext } from "../components/SocketProvider";

export default function Display() {
  const [buzzerTeam, setBuzzerTeam] = useState(null);
  const socket = useContext(SocketContext);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/buzzer2.mp3");

    if (socket) {
      socket.on("buzzerPressed", (team) => {
        setBuzzerTeam(team);
        // Play buzzer sound
        audioRef.current
          .play()
          .catch((error) => console.log("Audio play failed:", error));
      });
      socket.on("buzzerReset", () => {
        setBuzzerTeam(null);
      });
    }

    return () => {
      if (socket) {
        socket.off("buzzerPressed");
        socket.off("buzzerReset");
      }
    };
  }, [socket]);

  return (
    <div style={{ fontSize: "4rem", textAlign: "center", marginTop: "5vh" }}>
      {buzzerTeam ? <h1>{buzzerTeam}</h1> : <p>Waiting for buzz...</p>}
    </div>
  );
}
