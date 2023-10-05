import * as amqp from "amqplib";
import { CHAT_MSG_URL, CHAT_MSG_QUEE_NAME } from "../../constants/index.js";

class RabbitMqChatMessageProvider {
  async sendMessage(chatId, userId, message, createdAt) {
    const connection = await amqp.connect(CHAT_MSG_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(CHAT_MSG_QUEE_NAME, { durable: true });

    const chatMessage = {
      chatId,
      userId,
      message,
      createdAt,
    };

    const jsonMessage = JSON.stringify(chatMessage);

    channel.sendToQueue(CHAT_MSG_QUEE_NAME, Buffer.from(jsonMessage));

    await channel.close();
    await connection.close();
  }
}

export default RabbitMqChatMessageProvider;
