import MongooseChatProvider from "../../providers/mongoose/chats/providers/MongooseChatProvider.js";
import RedisCacheProvider from "../../providers/redis/RedisCacheProvider.js";

class ChatController {
  CHAT_CACHE_KEY = "chats";
  chatProvider = new MongooseChatProvider();
  cacheProvider = RedisCacheProvider.getInstance();

  async createChat(userId, partnerId) {
    await this.cacheProvider.invalidate(`${this.CHAT_CACHE_KEY}-${userId}`);
    return await this.chatProvider.createChat([userId, partnerId]);
  }

  async getUserChats(userId) {
    let userChats = await this.cacheProvider.recover(
      `${this.CHAT_CACHE_KEY}-${userId}`
    );

    if (userChats) return userChats;

    userChats = await this.chatProvider.getChatsByUserId(userId);
    this.cacheProvider.save(`${this.CHAT_CACHE_KEY}-${userId}`, userChats, 120);
    return userChats;
  }
}

export default ChatController;
