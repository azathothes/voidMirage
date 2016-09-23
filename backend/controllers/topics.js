"use strict"
const article = require('../models/Article');
const markdown = require('markdown').markdown;
module.exports.topic = function*(){
	console.log(this.params.art_id);
	let arts = yield article.findOne({_id:this.params.art_id});
	arts.art_content = markdown.toHTML(arts.art_content);
  	yield this.render('topic.html',{article:arts});
}