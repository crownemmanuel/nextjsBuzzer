import { useContext } from "react";
import { SocketContext } from "../components/SocketProvider";

export default function Control() {
  const socket = useContext(SocketContext);

  const handleReset = () => {
    if (socket) {
      socket.emit("reset");
    }
  };

  return (
    <div>
      <h2>Buzzer Control</h2>
      <button onClick={handleReset}>Reset Buzzer</button>
    </div>
  );
}
