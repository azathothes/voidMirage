var User = require('../models/User.js');
var Source = require('../models/source.js');
var Blog = require('../models/blogModel.js');
module.exports = function(app){
	//app.get('/blog/:user_name',cksession);
	app.get('/blog/:user_name',function(req,res){
	var username = req.params.user_name;
		console.log(username);
		User.findOne({user_id:username},function(err,user){
			if(err)
			{
				res.redirect('/error');
				res.end();
				return;
			}
			if(user == null)
			{
				res.redirect('/error');
				res.end();
				return;
			}
			else
			{
				var userid = user._id;
				console.log(userid);
				Source.find({poster_id:userid},function(err,arts){
					if(err)
					{
						res.redirect('/error');
						res.end();
						return;
					}
					Blog.findOne({blog_owner:userid},function(err,blog){
						console.log('=======');
						console.log(user);
						console.log(arts);
						console.log(blog);
						console.log('=======');
						if(err)
						{
							res.redirect('/error');
							res.end();
							return;
						}
						res.render('blog',{blogInfo:{user:user,listArt:arts,blog:blog}});
						res.end();
					});
				})
			}
		});
	});
}

/*function cksession(req,res,next){
	if(!req.session.user)
	{
		res.redirect('/login');
	}
	next();
};*/