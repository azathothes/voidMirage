"use strict"
const articles = require('../models/Article');
module.exports.admin = function*(){
	if(!this.session.user)
	{
		this.redirect('/signin?return=admin_post');
		return;
	}
   yield this.render('admin.html')
}
exports.post_article = function*(){

	if(!this.session.user)
	{
		this.redirect('/signin?return=admin_post');
		return;
	}
	let content = this.request.body;
	if(!content.classname || !content.title || !content.content || content.tagname === '请选择')
	{
		this.body = JSON.stringify({isok:false,msg:'uncomplete article info.'});
		return;
	}
    (new articles({
		art_title:content.title,
		art_create_date:new Date(),
		art_author:{
			author_id:this.session.user._id,
			author_avator:this.session.user.usr_avator
			},
		art_classify:['test_class'],
		art_content:content.content,
		art_tag_info:content.tagname,
		art_last_reply:new Date()
	})).save().catch(err=>{
    	this.body = JSON.stringify({isok:false,msg:err});
		return;
	});
	this.redirect('/');
}