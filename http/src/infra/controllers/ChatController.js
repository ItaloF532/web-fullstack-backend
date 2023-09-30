import MongooseChatProvider from "../../providers/mongoose/chats/providers/MongooseChatProvider.js";

class ChatController {
  chatProvider = new MongooseChatProvider();

  async createChat(userId, partnerId) {
    return await this.chatProvider.createChat([userId, partnerId]);
  }

  async getUserChats(userId) {
    return await this.chatProvider.getChatsByUserId(userId);
  }
}

export default ChatController;
