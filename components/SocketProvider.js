import React, { createContext, useEffect, useState, useCallback } from "react";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const sendMessage = useCallback(
    (message) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      }
    },
    [socket]
  );

  useEffect(() => {
    const wsUrl = `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${
      window.location.host
    }/api/socket`;
    const newSocket = new WebSocket(wsUrl);

    newSocket.onopen = () => {
      console.log("WebSocket connected");
      setSocket(newSocket);
    };

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "buzzerPressed") {
        // Handle buzzer pressed
        console.log("Buzzer pressed by:", message.team);
      } else if (message.type === "buzzerReset") {
        // Handle buzzer reset
        console.log("Buzzer reset");
      }
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    newSocket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      if (newSocket) newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
