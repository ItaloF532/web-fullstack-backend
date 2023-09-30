import userModel from "../models/UserModel.js";

class MongooseUserProvider {
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
    return users.map((user) => user.username);
  }
}

export default MongooseUserProvider;
