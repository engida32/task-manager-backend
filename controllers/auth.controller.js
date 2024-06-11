import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import catchAsync from "../config/catchAsync.js";
import User from "../schema/user.js";
dotenv.config();
const jwtSecret = process.env.jwtSecret;
const login = catchAsync(async (req, res) => {
  console.log(jwtSecret, "jwtSecret");
  let { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(400).send({
      message: "Please fill in all required fields",
    });
  }
  const allowedFields = ["email", "password"];
  const receivedFields = Object.keys(req.body);
  const isAllowed = receivedFields.every((field) =>
    allowedFields.includes(field)
  );
  if (!isAllowed) {
    return res.status(400).send({
      message: "Invalid field(s) provided",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).send({ error: "An error occurred" });
      }
      if (!result) {
        return res.status(401).send({ error: "Invalid credentials" });
      }
      console.log(user._id);
      const token = jwt.sign({ id: user._id }, jwtSecret, {
        expiresIn: "1h",
      });

      res.status(200).send({
        message: "Login successful",
        token: token,
        user: { name: user.name, email: user.email },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
});

export default login;
