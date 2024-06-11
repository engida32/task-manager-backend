//handle create controller to be used in routes

import bcrypt from "bcryptjs";
import catchAsync from "../config/catchAsync.js";
import User from "../schema/user.js";

const createUser = catchAsync(async (req, res) => {
  let { name, email, password } = req.body;
  //unique email validation
  if (!name || !email || !password) {
    return res.status(400).send({
      message: "Please fill in all required fields",
    });
  }
  //make sure user does not exist
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send({ error: "User already exists" });
  }

  //hash password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send({ error: "An error occurred" });
    }
    //create user
    const user = new User({
      name: name,
      email: email,
      password: hash,
    });
    //save user
    user
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((error) => res.send(res));
  });
});
//get users

export { createUser };
