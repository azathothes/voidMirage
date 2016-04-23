var User = require('../models/User');
var Source = require('../models/source');
module.exports = function(app){
	app.get('/blog/:user_name',cksession);
	app.get('/blog/:user_name',function(req,res){
		var username = req.params.user_name;
		User.findByNames(username,username,function(err,result){
			if(err)
			{
				return;
			}
			if(result.length == 0)
			{
				res.redirect('/error');
				res.end();
				return;
			}
			if(result[0].name != username)
			{
				res.redirect('/error');
				res.end();
				return;
			}
			Source.find(result[0].id,1,function(err,resouce){
				if(err)
				{
					return;
				}
				if(resouce.length == 0)
				{
					res.render('blog',{viewData:null});
					return;
				}
				res.render('blog',{viewData:{html:result[0].content , user:result[0].id}});
				return;
			});
		});
	});

};

function cksession(req,res,next){
	if(!req.session.user)
	{
		res.redirect('/login');
	}
	next();
};