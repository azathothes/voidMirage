const mongoose = require('../common/db').db;

var Article = mongoose.Schema({
    art_title: String,
    art_create_date:Date,
    art_author:Schema.Types.ObjectId,
    art_visit_count:{type:Number,default:0},
    art_last_reply:{type:Date,default:new Date()},
    art_classify:[String],
    art_content:String,
    art_reply:[]
})

var article = mongoose.model('Article',Article,'articles');

module.exports = article;
