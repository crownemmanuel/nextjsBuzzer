import { useContext } from "react";
import { SocketContext } from "../components/SocketProvider";

export default function Control() {
  const { sendMessage } = useContext(SocketContext);

  const handleReset = () => {
    sendMessage("reset", {});
  };

  return (
    <div>
      <h2>Buzzer Control</h2>
      <button onClick={handleReset}>Reset Buzzer</button>
    </div>
  );
}
