import React, { createContext, useEffect, useState } from "react";
import Pusher from "pusher-js";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [pusher, setPusher] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    const channel = pusherInstance.subscribe("buzzer-channel");

    setPusher(pusherInstance);
    setChannel(channel);

    return () => {
      if (pusherInstance) {
        pusherInstance.unsubscribe("buzzer-channel");
        pusherInstance.disconnect();
      }
    };
  }, []);

  const sendMessage = (eventName, data) => {
    if (channel) {
      fetch("/api/pusher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event: eventName, data }),
      });
    }
  };

  return (
    <SocketContext.Provider value={{ pusher, channel, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
