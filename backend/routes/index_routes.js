const router = require('koa-router')();
const index = require('../controllers/index.js');
const admin = require('../controllers/admin.js')
const topic = require('../controllers/topics.js');

router.get('/',index.index);
router.get('/admin',admin.admin);
router.post('/post_article',admin.post_article);
//router.get('/about');
router.get('/signin',index.signin_page);
router.post('/signin',index.signin_data)
router.get('/topic/:art_id',topic.topic);
module.exports = router;
