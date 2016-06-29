var mongoose = require('./db.js');

var articleSchema = mongoose.Schema({
	title:String,
	content:String,
	create_date:{time:{type:Date , default:new Date()},year:{type:Number,default:new Date().getFullYear()},mounth:{type:Number,default:new Date().getMonth()+1},day:{type:Number,default:new Date().getDate()}},
	author:{type:String},
	author_id:{type:String},
	author_icon:{type:String},
	author_motor:{type:String},
	visit:{type:Number,default:0},
	comment_times:{type:Number,default:0},
	last_reply:{user_icon:String,reply_time:{type:String,default:new Date().toLocaleDateString()}},
	comments:{type:[],default:[]}
});


var articleModel = mongoose.model('Article',articleSchema,'article');

module.exports = articleModel;