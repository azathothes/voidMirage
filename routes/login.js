var User = require('../models/User.js');
module.exports = function(app){
	app.use(function(req,res,next){
		res.locals.iderr = req.session.iderr ? req.session.iderr : null;
		res.locals.passerr = req.session.passerr ? req.session.passerr : null;
		req.session.iderr = req.session.passerr = null;
		next();
	});
	app.get('/login',function(req,res){
		res.render('login');
	});
	app.post('/login',function(req,res){
		var loginid = req.body.loginid;
		var passwd = req.body.passwd;
	
		User.find(loginid,function(err,result){
			if(err)
			{
				return;
			}
			if(result.length == 0)
			{
				req.session.iderr = "can not find user by loginid";
				res.redirect('/login');
				res.end();
				return;
			}
			if(result[0].passwd != passwd)
			{
				req.session.passerr = "password error";
				res.redirect('/login');
				res.end();
				return;
			}
			req.session.user = result;
			res.redirect('/home');
			res.end();
		});
	});
};