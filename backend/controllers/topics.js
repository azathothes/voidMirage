module.exports.topic = function*(){
	console.log(this.params.art_id);

  	yield this.render('topic.html');
}