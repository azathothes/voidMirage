var mongoose = require('./db.js');

var blogArtSchema = mongoose.Schema({
    id_poster:  {type: String} ,
    blog_title_main:String,
    content:String,
    post_date:{ type: Date, default: new Date},
    classify_id:{ type: String, default: null},
    comments:{type:Number,default:0},
    clicks:{type:Number,default:0}
});


var blogArtModel = mongoose.model('BlogArts',blogArtSchema,'blogArts');

module.exports = blogArtModel;


