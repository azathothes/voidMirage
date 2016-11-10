const mongoose = require('../common/db').db;

var Article = mongoose.Schema({
    art_title: String,
    art_create_date:Number,
    art_author:{
    	author_id:mongoose.Schema.Types.ObjectId,
    	author_avator:String,
        author_name:String
    },
    art_visit_count:{type:Number,default:0},
    art_last_reply:{type:String},
    art_classify:[String],
    art_content:String,
    art_reply:[],
    art_isdel:{type:Number,default:0},
    art_tag_info:String,
    art_is_top:{type:Number,default:0}
})

var article = mongoose.model('Article',Article,'articles');

module.exports = article;
