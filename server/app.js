import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";
import "./Database/mongoDB.js";
import { config } from "dotenv";
config();
import cookieParser from "cookie-parser";

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//for our routes / api calls
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port} 🍏`);
});

export default app;
