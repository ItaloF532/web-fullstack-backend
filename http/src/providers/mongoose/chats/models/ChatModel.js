import mongoose, { Schema } from "mongoose";

const database = mongoose.connection.useDb("web-fullstack");

const chatSchema = new Schema(
  {
    users: { type: [String], required: true },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    collection: "chats",
  }
);

const chatModel = database.model("chats", chatSchema);

export default chatModel;
