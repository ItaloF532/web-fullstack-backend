import mongoose, { Schema } from "mongoose";

const database = mongoose.connection.useDb("web-fullstack");

const messageSchema = new Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: String, default: new Date().toISOString() },
});

const chatMessageSchema = new Schema(
  {
    chatId: { type: String, required: true },
    messages: { type: [messageSchema], default: [] },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    collection: "chat-messages",
  }
);

const chatMessageModel = database.model("chat-messages", chatMessageSchema);

export default chatMessageModel;
