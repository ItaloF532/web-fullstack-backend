import chatMessageModel from "../models/ChatMessageModel.js";

class MongooseChatMessageProvider {
  async writeMessage(chatId, userId, message) {
    const chat = await chatMessageModel.findOne({ chatId });
    chat.messages.push({
      userId,
      message,
      createdAt: new Date().toISOString(),
    });

    chatMessageModel.findOneAndUpdate(
      {
        chatId,
      },
      {
        messages: chat.messages,
      },
      { upsert: true, new: true }
    );
  }
}

export default MongooseChatMessageProvider;
