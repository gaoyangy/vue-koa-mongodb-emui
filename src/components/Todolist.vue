<template>
	<el-row class="content">
    <el-col :xs="{span: 20, offset: 2}" :sm="{span: 8, offset: 8}">
      <span>欢迎: {{name}},你的待办事项是:</span>
      <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <el-col :xs="24">
            <template v-if="!done">
              <template v-for="(item, index) in list">
                <div class="todo-list" v-if="item.status === false">
                  <span class="item">
                    {{index + 1}}.{{item.content}}
                  </span>
                  <span class="pull-right">
                    <el-button size="small" type="primary" @click="finished(index)">完成</el-button>
                    <el-button size="small" :plain="true" type="danger" @click="remove(index)">删除</el-button>
                  </span>
                </div>
              </template>
            </template>
            <div v-else-if="done">
              暂无待办事项
            </div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <template v-if="count > 0">
            <template v-for="(item, index) in list">
              <div class="todo-list" v-if="item.status === true">
                <span class="item finished">
                  {{index + 1}}.{{item.content}}
                </span>
                <span class="pull-right">
                  <el-button size="small" type="primary" @click="restore(index)">还原</el-button>
                </span>
              </div>
            </template>
          </template>
          <div v-else>
            暂无已完成事项
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<script>
  import jwt from 'jsonwebtoken';

  export default {
    data() {
      return {
        name: '...',
        id: '...',
        todos: '',
        activeName: 'first',
        list: [],
        count: 0
      };
    },
    computed: {
      done() {
        let count = 0;
        let length = this.list.length;
        for (let i of this.list) {
          i.status === true ? count += 1 : '';
        }
        this.count = count;
        return (count === length || length === 0);
      }
    },
    methods: {
      addTodos() {
        if (this.todos === '') return;
        let obj = {
          status: false,
          content: this.todos,
          user_name: this.name
        };
        this.$http.post('/api/todolist', obj)
          .then((res) => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '创建成功'
              });
              this.getTodolist();
            } else {
              this.$message.error('get失败');
            }
          }, (err) => {
            this.$message.error('创建失败');
            console.log(err);
          });
        this.todos = '';
      },
      finished(index) {
        this.$set(this.list[index], 'status', true);
        this.$message({
          type: 'success',
          message: '任务完成'
        })
      },
      remove(index) {
        this.list.splice(index, 1);
        this.$message({
          type: 'info',
          message: '任务删除'
        })
      },
      restore(index) {
        this.$set(this.list[index], 'status', false);
        this.$message({
          type: 'info',
          message: '任务还原'
        })
      },
      getUserInfo() {
        const token = sessionStorage.getItem('demo-token');
        if (token != null) {
          return jwt.verify(token, 'vue-koa-demo'); // {name:...,id:...}
        } else {
          return null;
        }
      },
      getTodolist() {
        this.$http.get(`/api/todolist/${this.name}`)
          .then((res) => {
            if (res.status === 200) {
              this.list = res.data;
            } else {
              this.$message.error('获取列表失败');
            }
          }, (err) => {
            this.$message.error('获取列表失败');
            console.log(err);
          });
      }
    },
    created() {
      const userInfo = this.getUserInfo(); // 获取用户信息
      if (userInfo != null) {
        this.id = userInfo.id;
        this.name = userInfo.name;
      } else {
        this.id = '';
        this.name = '';
      }
      this.getTodolist();
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-put
    margin: 20px auto

  .todo-list
    width: 100%
    margin-top: 8px
    padding-bottom: 8px
    border-bottom: 1px solid #eee
    overflow: hidden
    text-align: left
    .item
      font-size: 20px
      &.finished
        text-decoration: line-through
        color: #ddd

  .pull-right
    float: right
    color: red
</style>
