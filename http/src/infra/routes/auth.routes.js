import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import JwtUtil from "../../utils/JwtUtil.js";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    const token = authController.signIn(username, password);

    res.json({ token });
  } catch (error) {
    if (error?.message === "Invalid credentials!") {
      res.status(401).json({ message: "Invalid credentials!" });
    }

    throw error;
  }
});

export default authRouter;
