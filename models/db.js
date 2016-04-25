var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/voidMirage');
mongoose.connection.on('open',function(){
	console.log('connected successful');
});
module.exports = mongoose;
