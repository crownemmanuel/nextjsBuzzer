import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../components/SocketProvider";

export default function Buzzer() {
  const [teamName, setTeamName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const { channel, sendMessage } = useContext(SocketContext);

  useEffect(() => {
    const storedTeam = localStorage.getItem("teamName");
    if (storedTeam) {
      setTeamName(storedTeam);
      setIsRegistered(true);
    }
  }, []);

  const handleRegister = () => {
    if (teamName) {
      localStorage.setItem("teamName", teamName);
      setIsRegistered(true);
    }
  };

  const handleBuzz = () => {
    sendMessage("buzz", { team: teamName });
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
