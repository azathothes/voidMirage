var User = require('../models/User.js');
var source = require('../models/source.js');

module.exports = function(app){
	//app.get('/post/:user',cksession);
	app.get('/addBlog',function(req,res){
		if(!req.cookies['user'])
		{
			res.redirect('/userLogin?return=/addBlog');
			res.end();
		}
		res.render('addArticle',{user_id:req.cookies['user']});
	});
	app.post('/addBlog',function(req,res){
		console.log('post arts');
		if(req.cookies.user == null)
		{
			res.json({"issuccess":"no","message":"re_log"});
			res.end();
			return;
		}
		//check user avalible
		User.findOne({user_id:req.cookies.user},function(err,user){
			if(err)
			{
				res.json({"issuccess":"no","message":"server_error1"});
				res.end();
				return;
			}
			if(user == null)
			{
				res.json({"issuccess":"no","message":"user_find_error"});
				res.end();
				return;
			}
			var cons = new source({id_poster:user._id,blog_title_main:req.body.title,content:req.body.content,post_date:new Date});
			cons.save(function(err,id){
				if(err)
				{
					res.json({"issuccess":"no","message":"server_error2"});
					res.end();
				}
				console.log('save ok');
				res.json({"issuccess":"ok","message":"ok","user":user.user_id});
				res.end();
			});
		});
	});

};
