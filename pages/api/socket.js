import { Server } from "socket.io";

export const config = {
  runtime: "edge",
};

const SocketHandler = async (req) => {
  const io = new Server();

  io.on("connection", (socket) => {
    console.log("A client connected");

    socket.on("buzz", async (team) => {
      const response = await fetch(`${req.url}/state`, {
        method: "POST",
        body: JSON.stringify({ action: "buzz", team }),
      });
      const { currentBuzzer } = await response.json();
      io.emit("buzzerPressed", currentBuzzer);
    });

    socket.on("reset", async () => {
      await fetch(`${req.url}/state`, {
        method: "POST",
        body: JSON.stringify({ action: "reset" }),
      });
      io.emit("buzzerReset");
    });
  });

  return new Response(null, {
    status: 101,
    webSocket: io.engine.transport.ws,
  });
};

export default SocketHandler;
