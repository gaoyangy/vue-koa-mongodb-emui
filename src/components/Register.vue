<template>
	<el-row>
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
        欢迎注册
      </span>
      <el-row>
        <el-input v-model="account" placeholder="账号" type="text"></el-input>
        <el-input v-model="password" placeholder="密码" type="password" @keyup.enter.native="loginToDo"></el-input>
        <el-button type="primary" @click="loginToDo">注册</el-button>
      </el-row>
    </el-col>
	</el-row>
</template>

<script>
  import md5 from 'md5';

  export default {
    data() {
      return {
        account: '',
        password: ''
      };
    },
    methods: {
      loginToDo() {
        let obj = {
          name: this.account,
          password: md5(this.password)
        };
        this.$http.post('/auth/user', obj).then((res) => {
          if (res.data.success) {
            sessionStorage.setItem('demo-token', res.data.token);
            this.$message({
              type: 'success',
              message: '注册成功'
            });
            this.$router.push('/todolist');
          } else {
            this.$message.error(res.data.info);
            sessionStorage.setItem('demo-token', null);
          }
        }, (err) => {
          this.$message.error('请求错误');
          console.log(err);
          sessionStorage.setItem('demo-token', null);
        });
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-row.content
    padding: 16px

  .title
    font-size: 28px

  .el-input
    margin: 12px 0

  .el-button
    width: 100%
    margin-top: 12px
</style>

