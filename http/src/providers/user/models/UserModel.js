import mongoose, { Schema } from "mongoose";

const database = mongoose.connection.useDb("web-fullstack");

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    collection: "user",
  }
);

const userModel = database.model("articles", userSchema);

export default userModel;
