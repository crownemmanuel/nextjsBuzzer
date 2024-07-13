import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInitializer = async () => {
      const newSocket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || "", {
        path: "/api/socket",
      });
      setSocket(newSocket);
    };
    socketInitializer();

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
