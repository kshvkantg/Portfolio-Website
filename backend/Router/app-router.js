const Router = require('koa-router');
const { getAllQueries, createANewQuery } = require('../controller/QueryController');
const { getResume } = require('../controller/ResumeDownloadController');
const {renderIndexController,renderQueryController,renderUserLoginController} = require('../controller/RenderController');
const {authenticateLocalUser,initiatePassportReqController
    ,handelCallbackController,handelRedirectController} = require('../controller/AuthenticationController');

const router = new Router();

//Query page route
router.get('/api/query', getAllQueries);
router.post('/api/query', createANewQuery);
router.get('/query', renderQueryController);


//resume downloading route
router.get('/api/pdf', getResume);
router.get('/', renderIndexController);


//passport routes
router.get('/login/user',renderUserLoginController)

// handels initiating req that asks google to send back a
// token url after inital signupn
router.get("/auth/google",initiatePassportReqController);

// calls google callback with token inorder to fetch
// user queries
router.get("/auth/google/callback",handelCallbackController,handelRedirectController);

router.post("/login-user",authenticateLocalUser);
module.exports = router;