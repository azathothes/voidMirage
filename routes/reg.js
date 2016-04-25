/*var conn = require('../models/db.js')
var pool = require('../models/pool.js');
var User = require('../models/User.js');
var renderData = {user:null};
module.exports = function(app){
       app.get('/reg',function(req,res){
        	res.render('reg');
	})
	app.post('/reg',function(req,res){
		console.log('about to reg now');
		var passwdfirst = req.body.psd1;
		var passwdsecon = req.body.psd2;
		if(passwdfirst !== passwdsecon)
		{
			console.log('passwd error captured');
			req.session.passwderror = 'passwd dont same';
			res.redirect('/reg');
			res.end();
			return;
		}
		var user = new User({
			name:req.body.name,
			passwd:passwdfirst,
			email:req.body.email,
			phone:req.body.phone,
			loginid:req.body.loginname,
			level:1
		});
		console.log('find names here');
		User.findByNames(user.name,user.loginid,function(err,result){
			if(result.length != 0)
			{
				console.log('repuser!!!');
				console.log(result);
				console.log(result.name);
				console.log(user.name);
				if(result[0].name === user.name)
				{
					req.session.nameerror = 'same username';
				
				}
				if(result[0].loginname === user.loginid)
				{
					req.session.loginerror = 'same login name';
				
				}
				res.redirect('/reg');
				res.end();
				return;
			}
			user.save(function(err,user){
			if(err)
			{
				console.log("reg error occured: "+err)
			}
			 
			res.cookie('user',user);
			res.redirect('/home');
		});
		});
		
	})
}
*/

