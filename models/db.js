var mysql = require('mysql');

var conn = mysql.createPool({
			host:'localhost',
			user:'wanlf',
			password:'wlf112111',
			port:'3306',
			database:'VoidMirage',
		});

module.exports = conn;
