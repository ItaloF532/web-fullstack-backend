const DATA_BASE_URI = process.env.DATA_BASE_URI;

const SECRET_KEY = process.env.SECRET_KEY;

const CHAT_MSG_URL = `amqp://admin:${SECRET_KEY}@localhost:5672/`;

const CHAT_MSG_QUEE_NAME = process.env.CHAT_MSG_QUEE_NAME;

export { DATA_BASE_URI, SECRET_KEY, CHAT_MSG_QUEE_NAME, CHAT_MSG_URL };
