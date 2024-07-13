export const config = {
  runtime: "edge",
};

const clients = new Set();

const SocketHandler = async (req) => {
  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.onopen = () => {
    clients.add(socket);
  };

  socket.onclose = () => {
    clients.delete(socket);
  };

  socket.onmessage = async (event) => {
    const message = JSON.parse(event.data);

    if (message.type === "buzz") {
      const stateResponse = await fetch(
        `${req.url.split("/api/socket")[0]}/api/state`,
        {
          method: "POST",
          body: JSON.stringify({ action: "buzz", team: message.team }),
        }
      );
      const { currentBuzzer } = await stateResponse.json();

      for (const client of clients) {
        client.send(
          JSON.stringify({ type: "buzzerPressed", team: currentBuzzer })
        );
      }
    } else if (message.type === "reset") {
      await fetch(`${req.url.split("/api/socket")[0]}/api/state`, {
        method: "POST",
        body: JSON.stringify({ action: "reset" }),
      });

      for (const client of clients) {
        client.send(JSON.stringify({ type: "buzzerReset" }));
      }
    }
  };

  return response;
};

export default SocketHandler;
