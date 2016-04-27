var UserModel = require('../models/User.js');
var BlogModel = require('../models/blogModel.js');
//var renderData = {user:null};
module.exports = function(app){
    app.get('/signup',function(req,res){
        	res.render('signup');
	})
	app.post('/signup',function(req,res){
		var user_ids = req.body.userid;
		var user_pwds = req.body.userpwd1;
		UserModel.findOne({user_id:user_ids},function(err,user_find){
			if(err)
			{
				res.json({"isregok":"no","message":"服务器内部错误，稍后再试。"});
				res.end();
				return;
			}
			if(user_find != null)
			{
				res.json({"isregok":"no","message":"重复的用户名"});
				res.end();
				return;
			}
			else
			{
				var user = new UserModel({
					user_id:user_ids,
					user_pwd:user_pwds,
					create_time:new Date,
					is_activated:1
				});
				user.save(function(err,user_save){
					if(err)
					{
						res.json({"isregok":"no","message":"服务器内部错误，稍后再试。"});
						res.end();
						return;
					}
					else
					{
						var _userid = user_save._id;
						var Blog = new BlogModel({
							blog_name: user_ids+"的博客",
    						blog_owner: _userid,
    						blog_createDate:new Date
						});
						Blog.save(function(err,blog_save){
							if(err)
							{
							    user.remove({user_id:user_save.user_id});
							    res.json({"isregok":"no","message":"服务器内部错误，稍后再试。"});
								res.end();
								return;
							}
							else
							{
								res.json({"isregok":"ok","message":"ok"});
								res.end();
								return;
							}
						});
					}
				});
			}
		})
	})
}


