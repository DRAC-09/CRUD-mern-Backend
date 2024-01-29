import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routers/auth.routes.js";
import taskRoutes from "./routers/tasks.routes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "https://task-frontend-mern.vercel.app/",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// Rutes
app.use("/api/", authRoutes);
app.use("/api/", taskRoutes);

//Messaje
app.get("/api", function (req, res) {
  res.send("Servidor Funcionando");
});

export default app;
