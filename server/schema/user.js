/**
 * Created by unsad on 2017/3/24.
 */
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    user_name: {
      type: String,
      unique: true,
      index: {unique: true, dropDups: true}
    },
    password: {
      type: String,
      index: true
    },
    meta: {
      created: {
        type: Date,
        default: Date.now()
      },
      updated: {
        type: Date,
        default: Date.now()
      }
    }
  });

// 前置数据存储中间件
UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next();
});
module.exports = UserSchema;
