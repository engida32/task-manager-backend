import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Use middleware for parsing JSON
export default function connectDB() {
  const url = process.env.MONGO_URI;

  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
      // app.listen(PORT, () => {
      //   console.log(`Server running on port ${PORT}`);
      // });
    })
    .catch((err) => {
      console.error("Error connecting to database:", err.message);
      process.exit(1);
    });
}

// Export the app for use in other modules
export { app };
