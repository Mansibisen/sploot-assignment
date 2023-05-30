const { body } = require("express-validator");
const { isValidObjectId } = require("mongoose");

module.exports = {

  RegisterValidator: [
    body("name").isString().notEmpty(),
    body("email").isEmail().notEmpty(),
    body("password").isString().notEmpty(),
    body("age").isNumeric().notEmpty(),
    
    
  ],
  loginValidator: [
    body("email").isEmail().notEmpty(),
    body("password").isString().notEmpty(),
  ],
  ArticleValidator: [
    body("title").isString().notEmpty(),
    body("description").isString().notEmpty(),
    
    
    
  ],
  ProfileValidator: [
    body("age").isNumeric().optional(),
    body("name").isString().optional(),
    
    
    
  ],
  
};