import express from "express";
import "./providers/mongoose/connection.js";
import authRouter from "./infra/routes/auth.routes.js";
import userRouter from "./infra/routes/user.routes.js";
import chatRouter from "./infra/routes/chat.routes.js";

const app = express();

app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(chatRouter);

app.listen(8080, () => {
  console.log("HTTP Running on port 8080.");
});
