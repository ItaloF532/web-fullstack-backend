import express from "express";
import "./providers/connection.js";
import authRouter from "./infra/routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(authRouter);

app.listen(8080, () => {
  console.log("HTTP Running on port 8080.");
});
