const SECRET_KEY = "aHR0cC1mb3ItYXM2NGEtc3VmZmljaWVuY3ktZXhhbQ==";

const CHAT_MSG_URL = `amqp://admin:${SECRET_KEY}@localhost:5672/`;

const CHAT_MSG_QUEE_NAME = "chat-message";

export { SECRET_KEY, CHAT_MSG_URL, CHAT_MSG_QUEE_NAME };
