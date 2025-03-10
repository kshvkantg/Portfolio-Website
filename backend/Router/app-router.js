const Router = require('koa-router');
const { getAllItems, createItem } = require('../controller/QueryController');
const { getResume } = require('../controller/ResumeDownloadController');
const router = new Router();

router.get('/api/query', getAllItems);
router.post('/api/query', createItem);
router.get('/api/pdf', getResume );


router.get('/', async (ctx) => {
    await ctx.render('home.pug', { title: 'My Portfolio', message: 'Welcome to my website' });
});

router.get('/query', async (ctx) => {
    await ctx.render('query-card.pug', { title: 'My Portfolio', message: 'Welcome to my website' });
});

module.exports = router;