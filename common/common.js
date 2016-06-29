module.exports = {checkCookie:checkCookie,checkSession:checkSession};

function checkSession(returnStr){
	return function(req,res,next){
	if(!req.session.user)
	{
		res.redirect(`/login?return=${returnStr}`);
		res.end();
		return;
	}
	next();
};
}

function checkCookie(returnStr){
	return function(req,res,next){
		if(!req.cookies.user)
		{
			res.redirect(`/login?return=${returnStr}`);
			res.end();
			return;
		}
		next();
	}
}