var User = require('../models/User.js');
module.exports = function(app){
	app.get('/userLogin',function(req,res){
		if(req.cookies.user != null)
		{
			res.redirect('/home');
			res.end();
			return;
		}
		res.render('userLogin');
	});
	app.post('/userLogin',function(req,res){
		var loginid = req.body.userid;
		var passwd = req.body.userpwd;
		User.findOne({user_id:loginid},function(err,user){
			if(err)
			{
				res.json({"issuccess":"no","message":"服务器内部错误"});
				res.end();
				return;
			}
			if(user == null)
			{
				res.json({"issuccess":"no","message":"该用户不存在！"});
				res.end();
				return;
			}
			if(user['user_pwd'] != passwd)
			{
				res.json({"issuccess":"no","message":"密码错误"});
				res.end();
				return;
			}
			req.session.user = user._id;
			res.cookie('user',loginid,{path:'/',expires: new Date(Date.now() + 900000), httpOnly: true});
			res.json({"issuccess":"ok","message":"ok"});
			res.end();
			return;
		});
	});
};