var Article = require('../models/source.js');
var User = require('../models/User.js');
module.exports  = function(app){
	app.get('/topic/:art_id',function(req,res){
		var log_user = req.cookies['user'];
		Article.findById( req.params.art_id,function(err,art){
			console.log(art);
			if(err || art == null)
			{
				res.redirect('/error?msg=art_miss');
				res.end();
				return;
			}
			User.findById(art.id_poster,function(err,user_fd){
				if(err || user_fd == null)
				{
					res.redirect('/error?msg=user_miss');
					res.end();
					return;
				}
				res.render('topic',{poster:user_fd,art:art,user:log_user});
			});

		});
	});
}