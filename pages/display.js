import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../components/SocketProvider";

export default function Display() {
  const [buzzerTeam, setBuzzerTeam] = useState(null);
  const { channel } = useContext(SocketContext);

  useEffect(() => {
    if (channel) {
      channel.bind("buzz", (data) => {
        setBuzzerTeam(data.team);
      });
      channel.bind("reset", () => {
        setBuzzerTeam(null);
      });
    }

    return () => {
      if (channel) {
        channel.unbind("buzz");
        channel.unbind("reset");
      }
    };
  }, [channel]);

  return (
    <div>
      {buzzerTeam ? <h1>{buzzerTeam}</h1> : <h1>Waiting for buzz...</h1>}
    </div>
  );
}
