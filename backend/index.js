"use strict"

const app = require('koa')();
const views = require('koa-views');
const serve = require('koa-static');
const router = require('./routes/index_routes.js');
app.use(serve(__dirname+'/dist'));
app.use(views(__dirname + '/views',{
  map:{
    html:'ejs'
  }
}))
app.use(router.routes());
app.listen(3000);
