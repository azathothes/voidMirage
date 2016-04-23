var pool = require('./pool.js');

var Source = function(source){
	this.id_poster = source.id_poster;
	this.id_type = source.id_type;
	this.content = source.content;
	this.src = source.src;
	this.id = crypto.createHash('md5').update(this.content).digest('hex');
	this.save = function(callback){
		var params = [this.id_poster,this.id_type,this.content,this.src,this.id];
		pool.getConnection(function(err,conn){
			if(err)
			{
				callback(err);
				return;
			}
			else
			{
				conn.query('insert into source(id_poster,id_type,content,src,id) values(?,?,?,?,?)',params,function(err,result){
					if(err)
					{
						console.log('we got a err here: '+err);
						conn.release();
						return;
					}
					else
					{
						conn.release();
						callback(null,params[4]);
						
					}
				})				
			}
		});
	};
};


Source.find = function(id_poster,id_type,callback){

		
		pool.getConnection(function(err,conn){

			if(err)
			{
				console.log(err);
				return;
			}
			else
			{
				
				conn.query('select * from source where id_poster = ? and id_type = ? limit 1',[id_poster,id_type],function(err,result)
				{
					console.log(result);
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

module.exports = Source;