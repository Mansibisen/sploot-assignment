const loginRouter = require('express').Router();

const User = require('../../database/models/user.js');


const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const { createJWTtoken } = require("../../middlewares/jwt");
const { loginValidator } = require("../../middlewares/expressValidator");

loginRouter.post("/", loginValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Enter all fields" });
    const user = await User.findOne({ email });
    if (user === undefined || user === null)
      return res.status(400).json({ message: "User does not exist" });
    
    if ( !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Incorrect password" });
    const token = await createJWTtoken(user);
    
    const date = new Date();
    date.setTime(date.getTime() + 86400000);
    return res.status(200).json({ data : user, token, expiration: date });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" , error : err.message });
  }
});
module.exports = loginRouter;