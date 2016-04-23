module.exports = function(app){
	require('./home.js')(app);
	require('./blog.js')(app);
	//require('./about.js')(app);
	require('./reg')(app);
	require('./login')(app);
	require('./logout')(app);
	require('./post')(app);
};
