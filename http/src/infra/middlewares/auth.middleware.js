import JwtUtil from "../../utils/JwtUtil.js";

const jwtUtil = new JwtUtil();

function authMiddleware(req, res, next) {
  const token = req.header("authorization");

  if (!token) {
    return res.status(401).json({ message: "Missing authentication token!" });
  }

  try {
    const decodedToken = jwtUtil.decode(token.replace("Bearer ", ""));

    req.user = {
      id: decodedToken.user.id,
      username: decodedToken.user.username,
    };

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token!" });
  }
}

export { authMiddleware };
