/*var User = require('../models/User.js');
var source = require('../models/source.js');

module.exports = function(app){
	app.get('/post/:user',cksession);
	app.get('/post/:user',function(req,res){
		res.render('post');
	});
	app.post('/post/:user',function(req,res){
		//find user by user param
		var username = req.params.user;
		var contents = req.body.html;
		//check user avalible
		User.find(username,function(err,user){
			if(err)
			{
				res.redirect('/error');
				res.end();
			}
			if(user.length == 0)
			{
				res.redirect('/error');
				res.end();
			}
			if(user[0].loginid != username)
			{
				res.redirect('/login');
				res.end();
			}
			var cons = new source({id_poster:user[0].id,id_type:1,content:contents,src:""});
			cons.save(function(err,id){
				if(err)
				{
					res.redirect('/error');
					res.end();
				}
				if(!id)
				{
					res.redirect('/error');
					res.end();
				}
				res.redirect('/blog/'+user.loginid);
			});
		});
	});

};
function cksession(req,res,next)
{
	if(!req.session.user)
	{
		res.redirect('/login');
		res.end();
	}
	var user = req.params.user;
	if(user != req.session.user)
	{
		res.redirect('/login');
		res.end();
	}
	next();
}
*/