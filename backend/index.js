"use strict"

const app = require('koa')();
const views = require('koa-views');
const serve = require('koa-static');
const router = require('./routes/index_routes.js');
const bodyparser = require('koa-body-parser');
const session = require('koa-session');
app.keys = ['wanlf\'s little srcret'];

app.use(bodyparser());
app.use(serve(__dirname+'/Public'));
app.use(views(__dirname + '/views',{
  map:{
    html:'ejs'
  }
}))
app.use(session({maxAge:3*60*1000,key:'test-session-key'},app));
app.use(router.routes());
app.use(function* (){
	this.response.status = 404;
	yield this.render('404not_found');
});
app.listen(3000);
