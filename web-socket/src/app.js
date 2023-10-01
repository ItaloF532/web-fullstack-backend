import { WebSocketServer } from "ws";
// import * as amqp from "amqplib";
import { authMiddleware } from "./infra/middlewares/auth.middleware.js";
import ChatMessageController from "./infra/controllers/ChatMessageController.js";

const wss = new WebSocketServer({ port: 8000 });
const chatMessageController = new ChatMessageController();

wss.on("connection", function connection(ws, request) {
  ws.on("error", console.error);
  console.log(request.headers);
  const userIsAuthenticated = authMiddleware(request);

  console.log(userIsAuthenticated);
  ws.on("message", async (data, request) => {
    console.log(data);
    // if (!userIsAuthenticated) {
    //   ws.close(1008, "Authentication failed");
    //   return;
    // }
    // chatMessageController.postMessage(data);
  });
});
