const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const views = require('koa-views');
const path = require('path');
const koaStatic = require('koa-static');
const less = require('koa-less2x');

const colors = require('./utils/colors');
const router = require('./middlewares/routes');
// 项目内依赖

const app = new Koa();
const port = 9623;
// 创建 app

app.use(less(__dirname + '/public', {
  dest: path.join(__dirname, '/public')
}));
// less => css

app.use(convert(koaStatic(path.join(__dirname, '/public'))));
// 静态资源

app.use(convert(bodyParser()));
app.use(views(path.join(__dirname, '/views'), {
  extension: 'ejs'
}));
// 视图模板

app.use(router.routes()).use(router.allowedMethods());
app.use(async (ctx, next) => {
    console.info(`${ctx.request.method}: ${ctx.request.url}`.info);
    await next();
});
// 路由

app.listen(port);
console.info(`app running at port ${port}`.warn);