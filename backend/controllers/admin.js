"use strict"
const articles = require('../models/Article');
const formidable = require('koa-formidable');
const pathConvernter = require('path');
const classifys = require('../models/Classify')

const formOpt = {
	uploadDir:'./Public/Images/ArticleImgs',
	keepExtensions :true,

};
module.exports.admin = function*(){
	if(!this.session.user)
	{
		this.redirect('/signin?return=admin');
		return;
	}
	

    yield this.render('admin.html')
}




exports.post_article = function*(){

	if(!this.session.user)
	{
		this.redirect('/signin?return=admin');
		return;
	}
	let content = this.request.body;
	console.log(content);
	if(!content.classify || !content.title || !content.content || content.tagname === '请选择')
	{
		this.body = JSON.stringify({isok:false,msg:'uncomplete article info.'});
		return;
	}

	console.log(content.classify);

	//cache todo

	for (var item of content.classify) {
		//this can read from cache
		let class_tag = yield classifys.findOne({Classify_name:item.toLowerCase()});
		if(!class_tag)
		{
			yield (new classifys({
				Classify_name: item.toLowerCase(),
    			Classify_create_date:(new Date()).valueOf(),
    			Classify_count:1
			})).save()
		}
		else
		{
			yield classifys.update({Classify_name:item.toLowerCase()},{$inc:{Classify_count:1}})
		}
	}

	


    (new articles({
		art_title:content.title,
		art_create_date:(new Date()).valueOf(),
		art_author:{
			author_name:this.session.user.usr_nick_name,
			author_id:this.session.user._id,
			author_avator:this.session.user.usr_avator
			},
		art_classify:content.classify,
		art_content:content.content.trim(),
		art_tag_info:content.tagname,
		art_last_reply:(new Date()).valueOf()
	})).save().catch(err=>{
    	this.body = JSON.stringify({isok:false,msg:err});
		return;
	});


	this.body = JSON.stringify({isok:true,msg:'ok'});
}






module.exports.uploadImg_article = function *(){
	// parse a file upload
    var form = yield formidable.parse(formOpt,this);
    this.body = JSON.stringify({isok:true,filePath:`\Images\\ArticleImgs\\${pathConvernter.basename(form.files['file-imgs'].path)}`});
}