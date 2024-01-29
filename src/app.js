import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routers/auth.routes.js";
import taskRoutes from "./routers/tasks.routes.js";

const app = express();
const lista = [`http://localhost:${process.env.PORT_FRONTEND}`];

// Middlewares
app.use(
  cors({
    origin: lista,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// Rutes
app.use("/api/", authRoutes);
app.use("/api/", taskRoutes);

export default app;
