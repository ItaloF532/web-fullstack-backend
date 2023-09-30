import express from "express";
import authRouter from "./infra/routes/auth.routes";

const app = express();

app.use(express.json());
app.use(authRouter)

app.listen(8080, () => {
  console.log('HTTP Running on port 8080.');
});
