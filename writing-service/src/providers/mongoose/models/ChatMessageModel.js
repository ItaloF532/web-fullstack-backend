import mongoose, { Schema } from "mongoose";

const database = mongoose.connection.useDb("web-fullstack");

const messageSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const chatMessageSchema = new Schema(
  {
    chatId: { type: String, required: true },
    messages: { type: [messageSchema] },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    collection: "chat-messages",
  }
);

const chatMessageModel = database.model("chat-messages", chatMessageSchema);

export default chatMessageModel;
