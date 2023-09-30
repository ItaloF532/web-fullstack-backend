import fs from "fs";
import https from "https";
import express from "express";
import "./providers/mongoose/connection.js";
import authRouter from "./infra/routes/auth.routes.js";
import userRouter from "./infra/routes/user.routes.js";
import chatRouter from "./infra/routes/chat.routes.js";

const key = fs.readFileSync("/Users/italo/key.pem");
const cert = fs.readFileSync("/Users/italo/cert.pem");
const app = express();
const server = https.createServer({ key: key, cert: cert }, app);

app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(chatRouter);

server.listen(8080, () => {
  console.log("HTTPS Running on port 8080.");
});
