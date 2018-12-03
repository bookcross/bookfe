<template>
  <el-card class="box-card"style="width: 500px;margin: 100px auto">
    <div slot="header" class="clearfix" >
      <span>登录</span>
    </div>
    <div>
      <el-input placeholder="用户名" v-model="input3">
        <template slot="prepend"><div style="width: 40px">用户名</div></template>
      </el-input>
      <el-input placeholder="密码" v-model="input3" style="margin-top: 30px">
        <template slot="prepend" ><div style="width: 40px">密码</div></template>
      </el-input>
      <el-row style="margin-top: 30px">
        <el-button type="primary">登录</el-button>
        <el-button v-on:click="jumpTo('/register')">注册</el-button>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  export default {
        name: "Login"
    }
</script>

<style scoped>

</style>
