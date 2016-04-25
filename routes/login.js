var User = require('../models/User.js');
module.exports = function(app){
	/*
	app.use(function(req,res,next){
		res.locals.iderr = req.session.iderr ? req.session.iderr : null;
		res.locals.passerr = req.session.passerr ? req.session.passerr : null;
		req.session.iderr = req.session.passerr = null;
		next();
	});
	*/
	app.get('/login',function(req,res){
		res.render('login');
	});
	app.post('/login',function(req,res){
		var loginid = req.body.userid;
		var passwd = req.body.userpwd;
		User.findOne({user_id:loginid,user_pwd:passwd},function(err,user){
			if(err)
			{
				res.write({'issuccess':false,'message':'server error'});
				res.end();
				return;
			}
			if(user == null)
			{
				res.write({'issuccess':false,'message':'登录信息有误。'});
				res.end();
				return;
			}
			else
			{
				//req.session.user = result;
				res.redirect('/home');
				res.end();
			}
		});
	});
};