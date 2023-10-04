import MongooseChatProvider from "../../providers/mongoose/chats/providers/MongooseChatProvider.js";
import MongooseUserProvider from "../../providers/mongoose/user/providers/MongooseUserProvider.js";
import RedisCacheProvider from "../../providers/redis/RedisCacheProvider.js";

class ChatController {
  CHAT_CACHE_KEY = "chats";
  chatProvider = new MongooseChatProvider();
  cacheProvider = RedisCacheProvider.getInstance();
  mongoUserProvider = new MongooseUserProvider();

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

    if (!userChats.length) return [];

    const formatedChats = [];
    for (const chat of userChats) {
      const user1 = chat.users[0];
      const user2 = chat.users[1];
      const user1Data = await this.mongoUserProvider.getUserById(user1);
      const user2Data = await this.mongoUserProvider.getUserById(user2);

      formatedChats.push({
        id: chat._id.toString(),
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        users: [{ ...user1Data }, { ...user2Data }],
      });
    }

    this.cacheProvider.save(
      `${this.CHAT_CACHE_KEY}-${userId}`,
      formatedChats,
      120
    );
    return formatedChats;
  }
}

export default ChatController;
