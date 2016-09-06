"use strict"
const user = require('./models/User.js');

module.exports.index = function*(){
    //todo:
    //load user ==> me
    let me = yield user.find({usr_id:'wanlf'});
    //load articles
    yield render('index.html',{bloger:me});
}
