const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const views = require('koa-views');
const path = require('path');

const app = new Koa();
const router = new Router();

// Set up Pug as the templating engine
app.use(views(path.join(__dirname, 'views'), { extension: 'pug' }));
app.use(bodyParser());
app.use(serve(path.join(__dirname, 'public')));

// Routes
router.get('/', async (ctx) => {
  await ctx.render('home.pug', { title: 'My Portfolio', message: 'Welcome to my website' });
});

// router.get('/contact', async (ctx) => {
//   await ctx.render('contact');
// });

// router.post('/contact', async (ctx) => {
//   const { name, email, message } = ctx.request.body;
//   await Contact.create({ name, email, message });
//   ctx.body = { success: true, message: 'Message received!' };
// });

app.use(router.routes()).use(router.allowedMethods());

app.listen(3030, () => console.log('Server running on http://localhost:3030'));