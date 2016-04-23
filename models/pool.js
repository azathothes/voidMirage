var mysql = require('mysql');

var pool = mysql.createPool({
	database:'VoidMirage',
	user:'wanlf',
	password:'wlf112111',
	host:'localhost',
	port:'3306'
});

module.exports = pool;