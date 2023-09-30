import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constants/index.js";

class JwtUtil {
  encode(user) {
    return jwt.sign({ user }, SECRET_KEY, { expiresIn: "5m" });
  }

  decode(token) {
    return jwt.verify(token, SECRET_KEY);
  }
}

export default JwtUtil;
