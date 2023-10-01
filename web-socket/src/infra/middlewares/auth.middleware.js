import JwtUtil from "../../utils/JwtUtil.js";

const jwtUtil = new JwtUtil();

function authMiddleware(req) {
  const token = req?.headers?.authorization;

  if (!token) return false;

  try {
    const decodedToken = jwtUtil.decode(token.replace("Bearer ", ""));

    return !!decodedToken?.user?.id;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { authMiddleware };
