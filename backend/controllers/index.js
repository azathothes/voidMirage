"use strict"
const user = require('../models/User.js');

module.exports.index = function*(){
    //todo:
    //load user ==> me
    let me = yield user.find({usr_id:'wanlf'});

    //load articles
    yield this.render('index.html',{bloger:me});
}

module.exports.signin_page = function*(){
  if(this.session.user)
  {
      console.log('2')
      this.redirect('/');
      return;
  }
    yield this.render('signup');
}

module.exports.signin_data = function*(){
  console.log(this.session.user);

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
  console.log('3');
	//insert
  this.redirect('/');
}
