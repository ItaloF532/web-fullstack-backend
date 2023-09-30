import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/get-users", authMiddleware, async (req, res) => {
  const users = await userController.getUsersName();

  const currentUserIndex = users.findIndex((user) => user.id === req.user.id);
  users.splice(currentUserIndex, 1);

  res.send({ users });
});

export default userRouter;
