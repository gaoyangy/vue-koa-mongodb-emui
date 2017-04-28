module.exports = {
    port: 8000,
    session: {
        secret: 'vue-koa-demo',
        key: 'vue-koa-demo',
        maxAge: 395000000
    },
    mongodb: 'mongodb://localhost:27017/todolist'
};