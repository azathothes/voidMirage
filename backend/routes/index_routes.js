const router = require('koa-router')();
const index = require('../controllers/index.js');
const admin = require('../controllers/admin.js')


router.get('/',index.index);
//router.get('/article/:id',index.index);
router.get('/admin',admin.admin);
//router.get('/about');


module.exports = router;
