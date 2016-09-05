"use strict"

const app = require('koa')();
const views = require('koa-views');
const router = require('koa-router')();
const serve = require('koa-static');

app.use(serve(__dirname+'/public'));
app.use(views(__dirname + '/views',{
  map:{
    html:'ejs'
  }
}))


router.get('/',function *(){
    yield this.render('index.html');
});
router.get('/admin',function *(){
    yield this.render('admin.html');
});
app.use(router.routes());


app.listen(3000);
