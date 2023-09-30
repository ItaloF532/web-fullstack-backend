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
}

export default MongooseUserProvider;
