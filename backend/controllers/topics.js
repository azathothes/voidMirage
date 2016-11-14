"use strict"
const article = require('../models/Article');
const moment = require('moment');
const markdown = require('markdown').markdown;
module.exports.topic = function*(){
	
	if(this.params.art_id.length !== 24)
	{
		yield this.render('404not_found.html');
		return;
	}
	let arts = yield article.findOne({_id:this.params.art_id});
	if(!arts)
	{
		yield this.render('404not_found.html');
		return;
	}

    yield article.update({_id:this.params.art_id},{ $inc:{art_visit_count:1}});
	
	arts.art_content = markdown.toHTML(arts.art_content);

  	yield this.render('topic.html',{article:arts
  								  ,create_date:moment(arts.art_create_date).fromNow()
  								  ,last_reply:moment(arts.art_last_reply).fromNow()
  								  ,visitor:this.session.user
  								  ,moment:moment
  								});
}

module.exports.reply = function*(){
	if(!this.session.user)
	{
		this.redirect('/signin?return=admin');
		return;
	}
	let reply = this.request.body;
	if(!reply.content || !reply.reply_art_id)
	{
		this.body = JSON.stringify({isok:false,msg:'uncomplete reply info.'});
		return;
	}
	var replytime_unix = (new Date()).valueOf();
   
    var markowned_content = markdown.toHTML(reply.content);
    console.log(markowned_content);
	yield article.update({_id:reply.reply_art_id},{ $push:{art_reply:{
		reply_user:this.session.user,
		reply_time:replytime_unix,
		reply_content:markowned_content
	}},$set:{art_last_reply:replytime_unix}});

    this.body = JSON.stringify({isok:true,msg:'ok'});


}