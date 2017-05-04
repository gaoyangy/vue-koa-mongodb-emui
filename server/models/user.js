/**
 * Created by unsad on 2017/3/24.
 */
const mongoose = require('mongoose');
const UserSchema = require('../schema/user');
const User = mongoose.model('users', UserSchema);

module.exports = User;
