import JwtUtil from "../../utils/JwtUtil.js";

const jwtUtil = new JwtUtil();

function authMiddleware(req) {
  const token = req?.url?.split("token=")?.[1];
  if (!token) return false;

  try {
    const decodedToken = jwtUtil.decode(token);

    return !!decodedToken?.user?.id;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { authMiddleware };
