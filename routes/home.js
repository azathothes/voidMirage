var userModel = require('../models/User.js');
var common = require('../common/common.js');
var articleModel = require('../models/Article.js');
var EventProxy = require('eventproxy');
module.exports = function(app){
	//app.get('/home',common.checkCookie('home'));
	app.get('/',function(req,res){
		var ep = new EventProxy();
		ep.all('on_user_redy','on_article_redy',(userinfo,articles)=>{
			res.render('home',{userinfo:userinfo,listArts:articles});
		});
		ep.fail(err=>{
			console.log(err);
			res.render('error',{err:err});
		});
		//获取文章列表
		articleModel.find().then(docs=>{
			ep.emit('on_article_redy',docs);
				}).catch(err=>{
					ep.emit('error',err);
				});
		//获取用户信息
		if(req.cookies.user)
		{
			userModel.findOne({user_id:req.cookies.user}).exec().then(userinfo=>{
				if(userinfo)
				{
					ep.emit('on_user_redy',userinfo);
				}
				else
				{
					ep.emit('on_user_redy',null);
				}
			}).catch(err=>{
				ep.emit('error',err);				
			});
		}
		else
		{
			ep.emit('on_user_redy',null);
		}
		

	});
}


