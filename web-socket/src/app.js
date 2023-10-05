import { WebSocketServer } from "ws";
import { authMiddleware } from "./infra/middlewares/auth.middleware.js";
import ChatMessageController from "./infra/controllers/ChatMessageController.js";

const wss = new WebSocketServer({ port: 8000 });
const chatMessageController = new ChatMessageController();

const users = new Set();

function sendMessage(message) {
  users.forEach((user) => {
    user.ws.send(JSON.stringify(message));
  });
}

wss.on("connection", function connection(ws, request) {
  ws.on("error", console.error);

  const userIsAuthenticated = authMiddleware(request);

  if (!userIsAuthenticated) {
    ws.close(1008, "Authentication failed");
    return;
  }

  const userRef = { ws };
  users.add(userRef);

  ws.on("message", (data) => {
    const messageFromBuffer = data.toString();
    const parsedMessage = JSON.parse(messageFromBuffer);
    const { chatId, userId, message, createdAt } = parsedMessage;

    if (!chatId || !userId || !message || !createdAt) {
      ws.close(1003, "Invalid Message.");
      return;
    }

    sendMessage({ chatId, userId, message, createdAt });
    chatMessageController.postMessage(chatId, userId, message, createdAt);
  });

  ws.on("close", (code, reason) => {
    users.delete(userRef);
    console.log(`Connection closed: ${code} ${reason}!`);
  });
});
