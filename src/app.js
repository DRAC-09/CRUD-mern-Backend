import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routers/auth.routes.js";
import taskRoutes from "./routers/tasks.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// Rutes
app.use("/api/", authRoutes);
app.use("/api/", taskRoutes);

export default app;
