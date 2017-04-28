/**
 * Created by unsad on 2017/3/27.
 */
const mongoose = require('mongoose');
const ListSchema = new mongoose.Schema({
  user_name: {
    type: String,
    index: true
  },
  content: {
    type: String,
    index: true
  },
  status: {
    type: Boolean,
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
ListSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next();
});
module.exports = ListSchema;
