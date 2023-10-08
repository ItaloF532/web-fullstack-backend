import fs from "fs";
import cors from "cors";
import https from "https";
import express from "express";
import "./providers/mongoose/connection.js";
import authRouter from "./infra/routes/auth.routes.js";
import userRouter from "./infra/routes/user.routes.js";
import chatRouter from "./infra/routes/chat.routes.js";

const key = fs.readFileSync("/Users/italo/server.key");
const cert = fs.readFileSync("/Users/italo/server.crt");
const app = express();

const server = https.createServer({ key, cert }, app);

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(chatRouter);

server.listen(8080, () => {
  console.log("HTTPS Running on port 8080.");
});
