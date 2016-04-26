global.renderData = {user:null};
module.exports = function(app){
	
	app.get('/home',ckcookie);
	//app.get('/home',cksession);
	app.get('/home',function(req,res){
		console.log(renderData);
		res.render('home',renderData);
	});
	

}

function ckcookie(req,res,next){
	global.renderData = {user:null};
	if(req.cookies['user'])
	{
		renderData['user']=req.cookies['user'];
	}
	next();
}
function cksession(req,res,next){
	global.renderData = {user:null};
	if(req.session.user)
	{
		renderData['user'] = req.session.user;
	}
	next();
};
