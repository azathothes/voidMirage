var mongoose = require('./db.js');
var crypto = require('crypto');

var userSchema = mongoose.Schema({
    user_id: String,
    user_pwd:String,
    create_time:Date,
    is_activated:Number,
    age: Number
});


var userModel = mongoose.Model('User',userSchema,'user');

module.exports = userModel;
