/**
 * Created by unsad on 2017/3/24.
 */
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getUserById = async(ctx, next) => {
  const id = ctx.params.id;
  const userInfo = await User.findOne({user_name: id});
  ctx.response.body = userInfo;
};

const getUserByName = async(name) => (
  await User.findOne({user_name: name})
);
const postUserAuth = async(ctx) => {
  const data = ctx.request.body;
  const userInfo = await getUserByName(data.name);
  if (userInfo != null) {
    if (userInfo.password != data.password) {
      ctx.response.body = {
        success: false,
        info: '密码错误'
      }
    } else {
      const userToken = {
        name: userInfo.user_name,
        id: userInfo._id
      };
      const secret = 'vue-koa-demo'; // 指定token密钥
      const token = jwt.sign(userToken, secret);
      ctx.response.body = {
        success: true,
        token: token // 返回给客户端token
      }
    }
  } else ctx.response.body = {
    success: false,
    info: '用户不存在'
  }
};

module.exports = {
  getUserById,
  postUserAuth
};
