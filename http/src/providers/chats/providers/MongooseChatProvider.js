import chatModel from "../models/ChatModel.js";

class MongooseChatProvider {
  async createChat(users) {
    const createdChat = await chatModel.create({
      users,
    });

    return createdChat._id.toString();
  }

  async getChatsByUserId(userId) {
    const aggregation = `{ audiences: { $in: [ ObjectId('${userId}') ] } }`;
    const chats = await chatModel.aggregate(aggregation);
    return chats;
  }
}

export default MongooseChatProvider;
