<template>
  <el-card class="box-card"style="width: 600px;margin: 100px auto">
    <div slot="header" class="clearfix" >
      <span>注册</span>
    </div>
    <div>
      <el-input placeholder="用户名" v-model="input3">
        <template slot="prepend"><div style="width: 40px">用户名</div></template>
      </el-input>
      <el-input placeholder="密码" v-model="input3" style="margin-top: 30px">
        <template slot="prepend" ><div style="width: 40px">密码</div></template>
      </el-input>
      <el-input placeholder="重复密码" v-model="input3" style="margin-top: 30px">
        <template slot="prepend" ><div style="width: 40px">密码</div></template>
      </el-input>
      <el-row style="margin-top: 30px">
        <el-button type="primary">注册</el-button>
        <el-button>返回</el-button>
      </el-row>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "Register"
    }
</script>

<style scoped>

</style>
