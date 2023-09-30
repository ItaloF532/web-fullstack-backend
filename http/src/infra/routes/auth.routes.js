import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authController.signIn(username, password);

    res.send({ token });
  } catch (error) {
    if (error?.message === "Invalid credentials!") {
      res.status(401).send({ message: "Invalid credentials!" });
    }

    throw error;
  }
});

export default authRouter;
