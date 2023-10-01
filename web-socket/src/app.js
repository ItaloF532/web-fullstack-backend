import { WebSocketServer } from "ws";
import { authMiddleware } from "./infra/middlewares/auth.middleware.js";
import ChatMessageController from "./infra/controllers/ChatMessageController.js";

const wss = new WebSocketServer({ port: 8000 });
const chatMessageController = new ChatMessageController();

wss.on("connection", function connection(ws, request) {
  ws.on("error", console.error);

  const userIsAuthenticated = authMiddleware(request);

  if (!userIsAuthenticated) {
    ws.close(1008, "Authentication failed");
    return;
  }

  ws.on("message", (data) => {
    const messageFromBuffer = data.toString();
    const { chatId, userId, message } = messageFromBuffer;

    if (!chatId || !userId || !message) {
      ws.close(1003, "Invalid Message.");
      return;
    }

    chatMessageController.postMessage(data);
  });
});
