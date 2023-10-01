import RabbitMqChatMessageProvider from "../../providers/rabbitmq/RabbitMqChatMessageProvider.js";

class ChatMessageController {
  chatMessageProvider = new RabbitMqChatMessageProvider();

  async postMessage(chatId, userId, message) {
    return this.chatMessageProvider.sendMessage(chatId, userId, message);
  }
}

export default ChatMessageController;
