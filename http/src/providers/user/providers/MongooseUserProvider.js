import userModel from "../models/UserModel.js";
import { ObjectId } from "mongoose";

class MongooseUserProvider {
  async getUserById(id) {
    const mongoId = new ObjectId(id);
    const user = await userModel.findById(mongoId);

    return {
      id: user._id.toString(),
      username: user.username,
      password: user.password,
    };
  }

  async getUserByUserName(username) {
    const user = await userModel.findOne({
      username,
    });

    return {
      id: user._id.toString(),
      username: user.username,
      password: user.password,
    };
  }

  async getUsersName() {
    const users = await userModel.find();
    return users.map((user) => ({ id: user.id, username: user.username }));
  }
}

export default MongooseUserProvider;
