var pool = require('./pool.js');
var crypto = require('crypto');
var User = function(user){
	
	this.name = user.name;
	this.passwd = user.passwd;
	this.email = user.email;
	this.phone = user.phone;
	this.level = user.level;
	this.loginid = user.loginid;
	this.id = crypto.createHash('md5').update(this.loginid).digest('hex');
	this.save = function(callback){
		var params = [this.id,this.name,this.passwd,this.email,this.phone,this.loginid];
		pool.getConnection(function(err,conn){
			if(err)
			{
				callback(err);
				return;
			}
			else
			{
				conn.query('insert into user(id,name,passwd,email,phone,level,loginid) values(?,?,?,?,?,1,?)',params,function(err,result){
					if(err)
					{
						console.log('we got a err here: '+err);
						conn.release();
						return;
					}
					else
					{
						conn.release();
						callback(null,params[2]);
						
					}
				})				
			}
		});
	};
};


User.findByNames = function(username,loginid,callback){

		console.log('about to query for blogs');
		pool.getConnection(function(err,conn){
			if(err)
			{
				console.log(err);
				return;
			}
			else
			{
				conn.query('select * from user where name = ? or loginid = ? limit 1',[username,loginid],function(err,result)
				{
					if(err)
					{
						callback(err,null);
						conn.release();
						return;
					}
					else
					{
						callback(null,result);
						conn.release();
						return;
					}
				});
			}
		})

}

User.find = function(loginid,callback){

		
		pool.getConnection(function(err,conn){

			if(err)
			{
				console.log(err);
				return;
			}
			else
			{
				conn.query('select * from user where loginid = ? limit 1',[loginid],function(err,result)
				{
					if(err)
					{
						callback(err,null);
						conn.release();
						return;
					}
					else
					{
						callback(null,result);
						conn.release();
						return;
					}
				});
			}
		})

}


module.exports = User;
