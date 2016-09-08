"use strict"

const app = require('koa')();
const views = require('koa-views');
const serve = require('koa-static');
const router = require('./routes/index_routes.js');
const bodyparser = require('koa-body');
const session = require('koa-session');
session.maxAge = 3 * 60;
app.keys = ['wanlf\'s little srcret'];
app.use(bodyparser());
app.use(serve(__dirname+'/dist'));
app.use(views(__dirname + '/views',{
  map:{
    html:'ejs'
  }
}))
app.use(session(app));
app.use(router.routes());
app.listen(3000);
