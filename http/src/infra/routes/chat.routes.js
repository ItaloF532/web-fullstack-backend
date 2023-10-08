import { Router } from "express";
import ChatController from "../controllers/ChatController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const chatRouter = Router();
const chatController = new ChatController();

chatRouter.post("/create-chat", authMiddleware, async (req, res) => {
  try {
    const createdChat = await chatController.createChat(
      req.user.id,
      req.body.partnerId
    );

    res.send({ createdChat });
  } catch (error) {
    if (error?.message === "There is already a chat with this user!") {
      res
        .status(409)
        .send({ message: "There is already a chat with this user!" });
      return;
    }

    throw error;
  }
});

chatRouter.get("/get-user-chats", authMiddleware, async (req, res) => {
  const chats = await chatController.getUserChats(req.user.id);

  res.send({ chats });
});

chatRouter.get("/chat/:chatId/messages", authMiddleware, async (req, res) => {
  const chat = await chatController.getChatMessages(req.params.chatId);
  res.send({ chat });
});

export default chatRouter;
