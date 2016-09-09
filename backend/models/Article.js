const mongoose = require('../common/db').db;

var Article = mongoose.Schema({
    art_title: String,
    art_create_date:Date,
    art_author:{
    	author_id:mongoose.Schema.Types.ObjectId,
    	author_avator:String
    },
    art_visit_count:{type:Number,default:0},
    art_last_reply:{type:Date,default:new Date()},
    art_classify:[String],
    art_content:String,
    art_reply:[],
    art_isdel:{type:Number,default:0},
    art_tag_info:String
})

var article = mongoose.model('Article',Article,'articles');

module.exports = article;
