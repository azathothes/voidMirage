module.exports = function(app){
	app.get('/logout',function(req,res){
		req.session.destroy();
		res.cookie('user','null',{maxAge:0});
		res.redirect('/home');
	});
};