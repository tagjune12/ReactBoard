require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import db from 'mongoose';
import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';


const app = new Koa();
const router = new Router();

const { PORT, MONGO_URI } = process.env;

db.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(e => {
  console.log(e);
})

router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddleware)
// app인스턴스에 router 적용
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../../client/build');
app.use(serve(buildDirectory));
app.use(async ctx => {
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    await send(ctx, 'index.html', { root: buildDirectory })
  }
});


const port = PORT || 4000;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});