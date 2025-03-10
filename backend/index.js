const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const views = require('koa-views');


const path = require('path');
const dotenv = require('dotenv')

const connectToDatabase = require('./database/mongo_connection');

const app = new Koa();
const router = new Router();

dotenv.config()

app.use(views(path.join(__dirname, 'views'), { extension: 'pug' }));
app.use(bodyParser());
app.use(serve(path.join(__dirname, 'public')));

app.use(async (ctx, next) => {
  await next()
  const responseTime = ctx.response.get('X-Response-Time');
     console.log('--------------------------' + `\n`
     + `request method - ${ctx.method} ` + `\n`
     + `request url - ${ctx.URL} ` + `\n`
     + `response time - ${responseTime}` + `\n`
     + '------------------')
})

app.use(async (ctx, next) => {
  const start = Date.now();
  await next()
  const timeInMilliSecs = Date.now() - start
  ctx.set('X-Response-Time', `${timeInMilliSecs}ms`)
})


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

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

startServer()

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => console.log(`Server running on ${BASE_URL} started at ${new Date()}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

