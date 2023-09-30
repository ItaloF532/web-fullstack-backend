import chatModel from "../models/ChatModel.js";
import { ObjectId } from "mongoose";

class MongooseChatProvider {
  async createChat(users) {
    const createdChat = await chatModel.create({
      users,
    });

    return createdChat._id.toString();
  }

  async getChatsByUserId(userId) {
    const chats = await chatModel.find({
      users: { $elemMatch: { $eq: userId } },
    });
    return chats;
  }
}

export default MongooseChatProvider;
