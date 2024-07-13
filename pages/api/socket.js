import { Server } from "socket.io";

let currentBuzzer = null;

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: "/api/socket",
    addTrailingSlash: false,
  });
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("buzz", (team) => {
      if (!currentBuzzer) {
        currentBuzzer = team;
        io.emit("buzzerPressed", team);
      }
    });

    socket.on("reset", () => {
      currentBuzzer = null;
      io.emit("buzzerReset");
    });
  });

  console.log("Socket is initialized");
  res.end();
};

export default SocketHandler;
