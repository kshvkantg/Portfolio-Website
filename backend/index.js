const Koa = require('koa');

const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const views = require('koa-views');


const path = require('path');
const dotenv = require('dotenv')

const queryRouter = require('./Router/app-router')

const connectToDatabase = require('./database/mongo_connection');
const {renderWentWrongController, render404Controller} = require('./controller/RenderController')

const app = new Koa();

dotenv.config()

app.use(views(path.join(__dirname, 'views'), { extension: 'pug' }));
app.use(bodyParser());
app.use(serve(path.join(__dirname, 'public')));


// request logging mechanism -=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=
app.use(async (ctx, next) => {
  await next()
  const responseTime = ctx.response.get('X-Response-Time');
     console.log('--------------------------' + `\n`
     + `request method - ${ctx.method} ` + `\n`
     + `request url - ${ctx.URL} ` + `\n`
     + `request body - ${ctx.request.body} ` + `\n`
     + `response time - ${responseTime}` + `\n`
     + '------------------')
})

app.use(async (ctx, next) => {
  const start = Date.now();
  await next()
  const timeInMilliSecs = Date.now() - start
  ctx.set('X-Response-Time', `${timeInMilliSecs}ms`)
})

//-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=


app.use(queryRouter.routes()).use(queryRouter.allowedMethods());

//handel 404 and 500 code renders
app.use(render404Controller)
app.use(renderWentWrongController)

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

startServer().then(r => {})

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => console.log(`Server running on ${BASE_URL} started at ${new Date()}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

