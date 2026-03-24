// signaling-server.js
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    // пересылаем всем кроме отправителя
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});

console.log("Signaling server running on ws://localhost:3000");