const mongoose = require('../common/db').db;

var User = mongoose.Schema({
    usr_id:String,
    usr_nick_name:{type:String,default:''},
    usr_passwd:String,
    usr_create_date:{type:Date,default:new Date()},
    usr_avator:{type:String,default:''},
    usr_email:String
})

var user = mongoose.model('User',User,'user');

module.exports = user;
