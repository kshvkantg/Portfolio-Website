const Router = require('koa-router');
const { getAllItems, createItem } = require('../controller/QueryController');
const { getResume } = require('../controller/ResumeDownloadController');
const {renderIndexController,renderQueryController} = require('../controller/RenderController');
const {passport} = require('../Authentication/passport');

const router = new Router();

router.get('/api/query', getAllItems);
router.post('/api/query', createItem);
router.get('/api/pdf', getResume);


router.get('/', renderIndexController);
router.get('/query', renderQueryController);

//passport routes

// handels initiating req that asks google to send back a
// token url after inital signupn
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// calls google callback with token inorder to fetch
// user queries
router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    async (ctx) => {
        ctx.redirect("/api/query"); // Redirect to Query Page after user login
    }
);

module.exports = router;