var mongoose = require('./db.js');

var blogSchema = mongoose.Schema({
    blog_name: String,
    blog_owner: String,
    blog_createDate:Date
});


var blogModel = mongoose.model('Blog',blogSchema,'blog');

module.exports = blogModel;