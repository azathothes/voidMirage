var User = require('../models/User.js');
module.exports = function(app){
	app.get('/login',function(req,res){
		if(req.session.user != null)
		{
			res.redirect('/');
			res.end();
			return;
		}
		res.render('userLogin');
	});
	app.post('/login',function(req,res){
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
			req.session.user = {user_id:user.user_id,user_icon:user.user_icon,user_guid:user._id};//user.user_id;
			res.cookie('user',loginid,{path:'/',expires: new Date(Date.now() + 900000), httpOnly: true});
			res.json({"issuccess":"ok","message":"ok"});
			res.end();
			return;
		});
	});
};