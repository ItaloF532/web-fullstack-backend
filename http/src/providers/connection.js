import mongoose from "mongoose";
import { DATA_BASE_URI } from "../constants";

mongoose.connect(DATA_BASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
