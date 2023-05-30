const articleRouter = require('express').Router();

const Article = require('../../database/models/article.js');

const { validationResult } = require("express-validator");

const {
  ArticleValidator,
} = require("../../middlewares/expressValidator");
const User = require('../../database/models/user.js');


articleRouter.get("/articles", async (req, res) => {
    try {
     
      
      
      
      const articles = await Article.find({}).populate('author');

      const ArticleMap = [];
       articles.forEach((article) => {
            const curr = {};
            curr.author = {"name":article.author.name , "age":article.author.age , "email":article.author.email};
            curr.title = article.title;
            curr.description = article.description;
            ArticleMap.push(curr);
            console.log(article)
        });
      return res.status(200).json({data : ArticleMap , message :"List of all articles"})

    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Server Error, Try again later"  , error:err.message});
    }
  });
  articleRouter.post("/users/:userId/articles", ArticleValidator, async (req, res) => {
    try {
     
      const { title, description} = req.body;
      const user_id = req.params.userId;
      
      const user = await User.findById(user_id);
      if ( user === null) {
        return res.status(400).json({ message: "User(author) doesn't exists" });
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      
      
      const article = await Article.create({
        title,
        description,
        author :user,
        
        
       
      });
      return res.status(200).json({ message :"article added successfully" , data : article});
     

    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Server Error, Try again later" , error : err.message });
    }
  });
module.exports = articleRouter;