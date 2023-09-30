import MongooseUserProvider from "../../providers/user/providers/MongooseUserProvider.js";

class UserController {
  mongoUserProvider = new MongooseUserProvider();

  async getUsersName() {
    return await this.mongoUserProvider.getUsersName();
  }
}

export default UserController;
