import cookieParser from "cookie-parser";
import express from "express";
import connectDB from "./config/db.js";
import auth from "./middlewares/authMiddleware.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import userRoutes from "./routes/user.routes.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/tasks", auth, taskRoutes);

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  })
);
