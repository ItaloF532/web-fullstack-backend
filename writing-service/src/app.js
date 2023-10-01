import * as amqp from "amqplib";
import "./providers/connection.js";
import { CHAT_MSG_URL, CHAT_MSG_QUEE_NAME } from "./constants/index.js";
import WriteMessageController from "./controllers/WriteMessageController.js";

const chatMessageController = new WriteMessageController();

async function receiverApp() {
  const connection = await amqp.connect(CHAT_MSG_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(CHAT_MSG_QUEE_NAME, { durable: true });
  await channel.consume(
    CHAT_MSG_QUEE_NAME,
    async (msg) => {
      const jsonData = msg.content.toString();
      const receivedData = JSON.parse(jsonData);

      await chatMessageController.writeMessage(receivedData);

      channel.ack(msg);
    },
    {
      noAck: false,
    }
  );
}

receiverApp();
