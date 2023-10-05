import chatMessageModel from "../models/ChatMessageModel.js";

class MongooseChatMessageProvider {
  async writeMessage(chatId, userId, message, createdAt) {
    const messageData = {
      userId,
      message,
      createdAt,
    };

    const chat = await chatMessageModel.findOne({ chatId }).catch((_) => null);

    if (chat) {
      chat.messages.push(messageData);

      await chatMessageModel.findOneAndUpdate(
        {
          chatId,
        },
        {
          messages: chat.messages,
        },
        { upsert: true, new: true }
      );
    } else {
      await chatMessageModel.create({
        chatId,
        messages: [messageData],
      });
    }
  }
}

export default MongooseChatMessageProvider;
