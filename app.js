const Koa = require('koa');
const json = require('koa-json');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const db = require('./db/db');
const api = require('./server/routes/api');
const jwt = require('koa-jwt');
const path = require('path');
const serve = require('koa-static');
const historyApiFallback = require('koa-history-api-fallback');
//链接数据库
mongoose.connect(db.mongodb);
mongoose.Promise = global.Promise;

const app = new Koa();
//乱七八糟中间件
app.use(bodyParser());
app.use(json());
app.use(logger());

app.use(historyApiFallback());
app.use(serve(path.resolve('dist')));

// 显示执行时间
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
//用户验证
app.use(async(ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (err.status === 401) {
            ctx.response.status = 401;
            ctx.response.body = {
                success: false,
                token: null,
                info: 'token验证失败'
            }
        } else {
            throw err;
        }
    }
});
app.use(jwt({ secret: db.secret }));
//后端路由注册
app.use(api.routes());

// 错误处理
app.on('error', function(err) {
    log.error('server error', err);
});
app.listen(3000, () => {
    console.log('koa is listening in 8889');
});

module.exports = app;