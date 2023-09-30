import { Router } from "express";
import ChatController from "../controllers/ChatController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const chatRouter = Router();
const chatController = new ChatController();

chatRouter.post("/create-chat", authMiddleware, async (req, res) => {
  const createdChat = await chatController.createChat(
    req.user.id,
    req.body.partnerId
  );

  res.send({ createdChat });
});

chatRouter.get("/get-user-chats", authMiddleware, async (req, res) => {
  const chats = await chatController.getUserChats(req.user.id);

  res.send({ chats });
});

export default chatRouter;
