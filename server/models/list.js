/**
 * Created by unsad on 2017/3/27.
 */
const mongoose = require('mongoose');
const ListSchema = require('../schema/list');
const List = mongoose.model('lists', ListSchema);

module.exports = List;
