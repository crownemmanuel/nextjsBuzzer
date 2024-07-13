import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../components/SocketProvider";

export default function Buzzer() {
  const [teamName, setTeamName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [audio, setAudio] = useState(null);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const storedTeam = localStorage.getItem("teamName");
    if (storedTeam) {
      setTeamName(storedTeam);
      setIsRegistered(true);
    }

    // Initialize audio
    setAudio(new Audio("/buzzer.mp3"));
  }, []);

  const handleRegister = () => {
    if (teamName) {
      localStorage.setItem("teamName", teamName);
      setIsRegistered(true);
    }
  };

  const handleBuzz = () => {
    sendMessage({ type: "buzz", team: teamName });
    // Play buzzer sound
    if (audio) {
      audio.play().catch((error) => console.log("Audio play failed:", error));
    }
  };

  if (!isRegistered) {
    return (
      <div>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Team: {teamName}</h2>
      <button onClick={handleBuzz} className="buzzer">
        Buzz!
      </button>
    </div>
  );
}
