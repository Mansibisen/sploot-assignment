const profileRouter = require('express').Router();



const { validationResult } = require("express-validator");

const {
  ProfileValidator,
} = require("../../middlewares/expressValidator");
const User = require('../../database/models/user.js');


profileRouter.put("/users/:userId", ProfileValidator , async (req, res) => {
    try {
     
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ message :"fill input correctly" , error: errors.array() });
        }
        
      
      
      const user = await User.findById(req.params.userId);
      
      if ( user === null) {
        return res.status(400).json({ message: "User doesn't exists" });
      }
      
      if(req.body.age !== undefined){
        user.age = req.body.age;
      }
      
      if(req.body.name !== undefined  ){
        user.name = req.body.name;
      }
      
      await user.save();
      const  updated_user = await User.findById(req.params.userId);
      
      return res.status(200).json({data : updated_user  , message :"User updated successfully"})

    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Server Error, Try again later"  , error :err.message});
    }
  });

module.exports = profileRouter;