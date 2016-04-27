var mongoose = require('./db.js');

var blogArtSchema = mongoose.Schema({
    art_name: String,
    id_poster: String,
    blog_id:String,
    blog_title_main:String,
    blog_title_side:String,
    post_date:Date,
    classify_id:String
});


var blogArtModel = mongoose.model('BlogArts',blogArtSchema,'blogArts');

module.exports = blogArtModel;


