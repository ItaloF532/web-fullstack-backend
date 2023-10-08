const SECRET_KEY = process.env.SECRET_KEY;

const CHAT_MSG_URL = `amqp://admin:${SECRET_KEY}@localhost:5672/`;

const CHAT_MSG_QUEE_NAME = process.env.CHAT_MSG_QUEE_NAME;

export { SECRET_KEY, CHAT_MSG_URL, CHAT_MSG_QUEE_NAME };
