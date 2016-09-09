"use strict"
const user = require('../models/User.js');
const articles = require('../models/Article.js')
module.exports.index = function*(){
	let current_user = this.request.user;
	let me = null;
	if(current_user)
	{
		me = current_user;
	}
	else
	{
		me = yield user.find({usr_id:'wanlf'});
	}
	
    let list = yield articles.find({art_isdel:0});
    
    yield this.render('index.html',{bloger:me,list:list});
}

module.exports.signin_page = function*(){
  if(this.session.user)
  {
      this.redirect('/');
      return;
  }
    yield this.render('signup');
}

module.exports.signin_data = function*(){
  
	//query user
  let userinfo = this.request.body;
  if(!userinfo.userid || !userinfo.passwd)
  {
      this.body = JSON.stringify({isok:false,msg:'uncomplete user info.'});
      return;
  }
  let loguser = yield user.findOne({usr_id:userinfo.userid,usr_passwd:userinfo.passwd});
  if(!loguser)
  {
      this.body ={isok:false,msg:'incorrect user info.'}
      return;
  }
  this.session.user = loguser;
	//insert
  this.redirect('/');
}
