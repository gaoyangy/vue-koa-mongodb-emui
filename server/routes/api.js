/**
 * Created by unsad on 2017/3/27.
 */
const List = require('../controllers/list');
const Router = require('koa-router');
const api = new Router();

api.get('/api/todolist/:id', List.getTodolist);
api.post('/api/todolist', List.createTodolist);

module.exports = api;
