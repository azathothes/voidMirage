var mongoose = require('./db.js');
var crypto = require('crypto');

var userSchema = mongoose.Schema({
    user_id: String,
    user_pwd:String,
    create_time:{ type: Date, default: new Date },
    is_activated:{ type: Number, default: 1 },
    user_icon:{ type: String, default: "/usericons/defaulticon.jpg" },
    phone:{ type: String, default: null },
    email:{ type: String, default: null },
    age:{ type: Number, default: 0 },
    address:{ type: String, default: null},
    favourate:{type:[String],default:[]},
    signature:{type:String,default:"这个用户很懒，什么都没留下"}
});


var userModel = mongoose.model('User',userSchema,'user');

module.exports = userModel;
