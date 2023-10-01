const DATA_BASE_URI =
  "mongodb://admin:aHR0cC1mb3ItYXM2NGEtc3VmZmljaWVuY3ktZXhhbQ%3D%3D@localhost:27017/";

const SECRET_KEY = "aHR0cC1mb3ItYXM2NGEtc3VmZmljaWVuY3ktZXhhbQ==";

const CHAT_MSG_URL = `amqp://admin:${SECRET_KEY}@localhost:5672/`;

const CHAT_MSG_QUEE_NAME = "chat-message";

export { DATA_BASE_URI, SECRET_KEY, CHAT_MSG_QUEE_NAME, CHAT_MSG_URL };
