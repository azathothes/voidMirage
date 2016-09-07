"use strict"
const user = require('../models/User.js');

module.exports.index = function*(){
    //todo:
    //load user ==> me
    let me = yield user.find({usr_id:'wanlf'});

    //load articles
    yield this.render('index.html',{bloger:me});
}

module.exports.signup_page = function*(){
    yield this.render('signup');
}

module.exports.signup_data = function*(){
	//query user 
	//insert
    yield this.render('signup');
}