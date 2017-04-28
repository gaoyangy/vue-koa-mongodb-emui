/**
 * Created by unsad on 2017/3/27.
 */
const List = require('../models/list');
const getTodolistById = async(id) => (
await List.find({user_name: id}).select('status content')
);
const getTodolist = async(ctx) => {
  const id = ctx.params.id;
  const result = await getTodolistById(id);
  ctx.response.body = result;
};
const createTodolist = async(ctx) => {
  const data = ctx.request.body;
  let result = new List({
    user_name: data.user_name,
    content: data.content,
    status: data.status
  });
  try {
    await result.save();
  } catch(err) {
    console.log(err);
  }
  ctx.response.body = {
    success: true
  }
};

module.exports = {
  getTodolist,
  createTodolist
};
