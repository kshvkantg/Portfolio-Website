const Router = require('koa-router');
const { getAllItems, createItem } = require('../controller/QueryController');
const { getResume } = require('../controller/ResumeDownloadController');
const {renderIndexController,renderQueryController} = require('../controller/RenderController');

const router = new Router();

router.get('/api/query', getAllItems);
router.post('/api/query', createItem);
router.get('/api/pdf', getResume);


router.get('/', renderIndexController);
router.get('/query', renderQueryController);


module.exports = router;