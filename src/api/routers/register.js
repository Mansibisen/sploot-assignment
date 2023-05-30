const registerRouter = require('express').Router();

const User = require('../../database/models/user.js');

const { createJWTtoken } = require('../../middlewares/jwt');

const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const {
  RegisterValidator,
} = require("../../middlewares/expressValidator");



registerRouter.post("/", RegisterValidator, async (req, res) => {
    try {
      const { name, email, age, password   } = req.body;
      
      const pwd = await bcrypt.hash(
        password,
        parseInt(10, process.env.API_KEY)
      );
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      
      const uniqueEmail = await User.findOne({ email });
      if ( uniqueEmail !== null) {
        return res.status(400).json({ message: "User already exists" });
      }
      const user = await User.create({
        email,
        age,
        name,
        password: pwd,
        
       
      });
      const token = await createJWTtoken(user);
      const date = new Date();
      date.setTime(date.getTime() + 86400000);
      return res.status(200).json({ data : user, token, expiration: date });
      
      
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Server Error, Try again later"  , error : err.message});
    }
  });

module.exports = registerRouter;
