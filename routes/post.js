var common = require('../common/common.js');
var userModel = require('../models/User.js');
var articleModel = require('../models/Article.js');
module.exports = (app)=>{
	app.get('/post',common.checkSession('post'));
	app.get('/post',(req,res)=>{
		var user_id = req.cookies.user;
		//get user info
		userModel.findOne({user_id:user_id}).exec().then(user=>{
			if(!user)
			{

			}
			else
			{
				res.render('post',{userinfo:user});
			}
		}).catch(e=>{console.log(e);});
		
	});
	app.post('/post',(req,res)=>{
		userModel.findOne({user_id:req.session.user}).exec().then(user=>{
			if(!user)
			{

			}
			else
			{
				var art = new articleModel({
									title:req.body.title,
									content:req.body.content,
									author:req.session.user,
									author_id:req.body.uid,
									author_icon:user.user_icon
								});
				art.save().then(res=>{
					res.json({issuccess:"true",mesg:"ok"});
				}).catch(err=>{
					res.json({issuccess:"false",mesg:err});
				})
			}

		}).catch(err=>{console.log(err);})
		
	});
}