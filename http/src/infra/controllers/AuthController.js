import JwtUtil from "../../utils/JwtUtil.js";
import MongooseUserProvider from "../../providers/mongoose/user/providers/MongooseUserProvider.js";

class AuthController {
  jwtUtil = new JwtUtil();
  mongoUserProvider = new MongooseUserProvider();

  async signIn(username, password) {
    const user = await this.mongoUserProvider.getUserByUserName(username);

    const isValidUserName = username === user.username;
    const isValidPassword = password === user.password;

    if (!isValidUserName || !isValidPassword) {
      throw new Error("Invalid credentials!");
    }

    return this.jwtUtil.encode({ id: user.id, username: user.username });
  }
}

export default AuthController;
