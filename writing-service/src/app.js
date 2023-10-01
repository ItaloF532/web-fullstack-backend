import * as amqp from "amqplib";

const SECRET_KEY = "aHR0cC1mb3ItYXM2NGEtc3VmZmljaWVuY3ktZXhhbQ==";

const CHAT_MSG_URL = `amqp://admin:${SECRET_KEY}@localhost:5672/`;

const CHAT_MSG_QUEE_NAME = "chat-message";

amqp.connect(CHAT_MSG_URL, (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    channel.assertQueue(CHAT_MSG_QUEE_NAME, {
      durable: false,
    });

    channel.consume(
      CHAT_MSG_QUEE_NAME,
      (msg) => {
        console.log(" [x] Received %s", msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  });
});
