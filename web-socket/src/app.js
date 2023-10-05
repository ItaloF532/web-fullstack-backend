import { WebSocketServer } from "ws";
import { authMiddleware } from "./infra/middlewares/auth.middleware.js";
import ChatMessageController from "./infra/controllers/ChatMessageController.js";

const wss = new WebSocketServer({ port: 8000 });
const chatMessageController = new ChatMessageController();

const connections = new Set();

wss.on("connection", function connection(ws, request) {
  ws.on("error", console.error);

  const userIsAuthenticated = authMiddleware(request);

  if (!userIsAuthenticated) {
    ws.close(1008, "Authentication failed");
    return;
  }

  connections.add(ws);

  ws.on("message", (data) => {
    const messageFromBuffer = data.toString();
    const parsedMessage = JSON.parse(messageFromBuffer);
    const { chatId, userId, message, createdAt } = parsedMessage;

    if (!chatId || !userId || !message || !createdAt) {
      ws.close(1003, "Invalid Message.");
      return;
    }

    connections.forEach((conn) => conn.send(message));
    chatMessageController.postMessage(chatId, userId, message);
  });

  ws.on("close", () => {
    connections.delete(ws);
  });
});
