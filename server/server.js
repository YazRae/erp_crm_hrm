import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import { connectDB, corsOptions } from "./config/index.js";
import { errorHandler, logEvents, nodeVersionENV } from "./middleware/index.js";
import {
  adminRouter,
  apiRouter,
  authRouter,
  notFoundRoute,
  staticRoute,
} from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

nodeVersionENV();
connectDB();

app.use(helmet());
app.use(cors(corsOptions));
app.use(json());
app.use(express.static("public"));
app.use(cookieParser());

app.use(staticRoute);

app.use("/api", authRouter);

app.use("/api", [adminRouter, apiRouter]);

app.all("*", notFoundRoute);
app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
