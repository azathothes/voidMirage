var User = require('../models/User.js');
var Source = require('../models/source.js');
module.exports = function(app){
	//app.get('/blog/:user_name',cksession);
	app.get('/blog/:user_name',function(req,res){
	var username = req.params.user_name;
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
				console.log(userid)
				Source.find({id_poster:userid},function(err,arts){
					console.log(arts);
					if(err)
					{
						res.redirect('/error');
						res.end();
						return;
					}
					res.render('blog',{blogInfo:{user:user,listArt:arts}});
					res.end();
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