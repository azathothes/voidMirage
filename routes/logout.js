module.exports = function(app){
	app.get('/logout',function(req,res){
		req.session.user = null;
		res.cookie('user','null',{maxAge:0});
		console.log(global.renderData);
		global.renderData['user'] = null;
		res.redirect('/home');
	});
};