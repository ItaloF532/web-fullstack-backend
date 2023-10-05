import chatModel from "../models/ChatModel.js";
import { ObjectId } from "mongoose";

class MongooseChatProvider {
  async createChat(users) {
    const chats = await chatModel.find({
      users,
    });

    console.log(chats);

    if (chats.length) {
      throw new Error("There is already a chat with this user!");
    }

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
