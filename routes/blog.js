var User = require('../models/User');
var Source = require('../models/source');
module.exports = function(app){
	//app.get('/blog/:user_name',cksession);
	app.get('/blog/:user_name',function(req,res){
		var username = req.params.user_name;
		User.find({user_id:username},function(err,user){
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
				Source.find({poster_id:userid},function(err,arts){
					if(err)
					{
						res.redirect('/error');
						res.end();
						return;
					}
					res.render('/blog',{user:user,listArt:arts});
					res.end();
				})
			}
		});
		

};

function cksession(req,res,next){
	if(!req.session.user)
	{
		res.redirect('/login');
	}
	next();
};