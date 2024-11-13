import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import router from "./routes/index.js";
import { config as dotenvConfig } from "dotenv";
import { errorHandle } from "./errors/errHandle.js";
import { logger } from "./utils/logger.js";

dotenvConfig({ path: path.join(path.resolve(), ".env") });
const app = express();
const PORT = process.env.PORT || 5000;
const connection = mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

// Middleware de manejo de errores
app.use(errorHandle);

app.listen(PORT, () => logger.info(`Listening on ${PORT}`));