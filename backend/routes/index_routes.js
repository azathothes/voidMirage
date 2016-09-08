const router = require('koa-router')();
const index = require('../controllers/index.js');
const admin = require('../controllers/admin.js')


router.get('/',index.index);
//router.get('/article/:id',index.index);
router.get('/admin',admin.admin);
//router.get('/about');
router.get('/signin',index.signin_page);
router.post('/signin',index.signin_data)
module.exports = router;
