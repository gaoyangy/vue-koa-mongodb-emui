const List = require('../controllers/list');
const User = require('../controllers/user');
const Router = require('koa-router');
const api = new Router();
api.get('/api/todolist/:id', List.getTodolist);
api.post('/api/todolist', List.createTodolist);
api.get('/auth/user/:id', User.getUserById);
api.post('/auth/user', User.postUserAuth);


module.exports = api;