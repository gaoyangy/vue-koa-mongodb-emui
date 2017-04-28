/**
 * Created by unsad on 2017/3/24.
 */
const User = require('../controllers/user');
const Router = require('koa-router');
const auth = new Router();

auth.get('/auth/user/:id', User.getUserById);
auth.post('/auth/user', User.postUserAuth);

module.exports = auth;
