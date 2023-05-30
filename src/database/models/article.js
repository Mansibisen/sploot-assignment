const mongoose = require('mongoose');

const   ArticleSchema = new mongoose.Schema({
	title: String,
	
    description:String,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
	
    

	
});

module.exports = mongoose.model('Article', ArticleSchema);
