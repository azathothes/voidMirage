"use strict"
const user = require('../models/User.js');
const articles = require('../models/Article.js')
const querystring = require('querystring');
const classifys = require('../models/Classify')
const mapClass = {life:"生活",tech:"技术",other:"其他"};
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

    //assemble query options
    let querystrings = querystring.parse(this.request.querystring);

    let tags = querystrings.tag || 'all';
    let classes = querystrings.class || null;

    let options = {art_isdel:0};
    if(classes)
    {
      options.art_classify = classes;
    }
    
    if(tags !== 'all')
    { 
        options.art_tag_info = mapClass[tags];
    }

    let currentpage = parseInt((querystrings.page || 1),10);

    let totalArts = yield articles.count({art_isdel:0});

    currentpage = currentpage > -(~(totalArts/50)) ? -(~(totalArts/50)):currentpage;

    //query list
    let list = yield articles.find(options).skip((currentpage - 1)*50).limit(50).sort({art_create_date:-1});
    

    //query classify
    let class_names = yield classifys.find();


    yield this.render('index.html',{bloger:me,list:list,class_names:class_names,pageinfo:{
        tag:querystrings.tag || 'all',
        totalPages:-(~(totalArts/50)),
        currentPage:currentpage,
        pageFrom:currentpage - 2 <= 0 ? 1:currentpage -2,
        pageTo:currentpage+2 <= 5 ? 5:(currentpage + 2 >= -(~(totalArts/50)) ? -(~(totalArts/50)) : currentpage + 2)
    }});
}












module.exports.signin_page = function*(){
  let returnurl = querystring.parse(this.request.querystring);
  if(this.session.user)
  {
      this.redirect('/'+returnurl.return || "");
      return;
  }
    yield this.render('signin',{returnurl:returnurl});
}

module.exports.signin_data = function*(){
  
	//query user
  let userinfo = this.request.body;
  //query return
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
  if(userinfo.return)
  {
      this.redirect(`/${userinfo.return}`);
      return;
  }
  this.redirect('/');
}


module.exports.about = function *(){
    yield this.render('about');
}
