import JwtUtil from "../../utils/JwtUtil.js";

const jwtUtil = new JwtUtil();

function authMiddleware(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Missing authentication token!" });
  }

  try {
    const decodedToken = jwtUtil.decode(token, secretKey);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token!" });
  }
}

export { authMiddleware };
