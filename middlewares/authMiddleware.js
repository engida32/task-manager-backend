//auth middleware
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../schema/user.js";
dotenv.config;
const jwtSecret = process.env.jwtSecret;
const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
};

export default auth;
