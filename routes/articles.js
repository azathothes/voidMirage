var userModel = require('../models/User.js');
var articleModel = require('../models/Article.js');
var checkSession = require('../common/common.js').checkSession;
var EventProxy = require('eventproxy');
module.exports = (app)=>{
	app.get('/article/:id',(req,res)=>{
		var ep = new EventProxy();
		ep.all('user_find','art_find',(user,art)=>{
			res.render('article',{userinfo:user,art:art});
		})
		ep.emit('user_find',req.cookies.user);
		//get article
		articleModel.findOne({_id:req.params.id}).exec().then(art=>{
			if(!art)
			{
				throw "artfind error";
			}	
			ep.emit('art_find',art);
		}).catch(err=>{
			ep.emit('error',err);
		});
		ep.fail('error',err=>{
			console.log(err);
		});
		
	});
	app.post('/article/:id',checkSession(`/article/${req.params.id}`));
	app.post('/article/:id',(req,res)=>{
		//construct comment instance
		var reply = {"content":req.body.content,"create_date":new Date().toLocaleDateString(),"reply_id":req.session.user_id,"user_icon":req.session.user_icon};
		//get topit id
		
		//insert
		//redirect
	});
}