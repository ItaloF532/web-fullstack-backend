import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constants";

class JwtUtil {
  encode() {
    return jwt.sign({ username }, SECRET_KEY, { expiresIn: '5m' });
  }

  decode(token) {
    return jwt.verify(token, SECRET_KEY);
  }
}

export default JwtUtil;
