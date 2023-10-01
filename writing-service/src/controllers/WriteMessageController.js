import MongooseChatMessageProvider from "../providers/mongoose/providers/MongooseChatMessageProvider.js";

class WriteMessageController {
  chatMessageProvider = new MongooseChatMessageProvider();

  async writeMessage(chatId, userId, message) {
    await this.chatMessageProvider.writeMessage(chatId, userId, message);
  }
}

export default WriteMessageController;
