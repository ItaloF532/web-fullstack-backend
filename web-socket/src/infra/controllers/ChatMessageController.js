import RabbitMqChatMessageProvider from "../../providers/rabbitmq/RabbitMqChatMessageProvider.js";

class ChatMessageController {
  chatMessageProvider = new RabbitMqChatMessageProvider();

  async postMessage(chatId, userId, message, createdAt) {
    return this.chatMessageProvider.sendMessage(
      chatId,
      userId,
      message,
      createdAt
    );
  }
}

export default ChatMessageController;
