<template>
  <div style="background-color:#545c64">
    <el-menu
      style="width: 1200px;margin: 0 auto;border-bottom: 1px solid #545c64"
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

      <div style="float: left">
        <img src="../assets/logowhite.png" style="height: 50px;margin-top: 6px"/>&nbsp;&nbsp;
      </div>
      <el-menu-item index="1">图书中心</el-menu-item>
      <el-menu-item index="2">广场</el-menu-item>
      <el-menu-item index="3">意见栏</el-menu-item>
      <!--<el-menu-item index="3" disabled>消息中心</el-menu-item>-->
      <div style="float: right;padding-top: 10px">
          <el-input placeholder="请输入内容" size="small" v-model="input5" class="input-with-select" style="width:400px">
            <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:100px">
              <el-option label="图书" value="1"></el-option>
              <el-option label="帖子" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        &nbsp;&nbsp;
        &nbsp;&nbsp;
        <el-button  size="small">登录</el-button>
        <el-button type="text"  style="color:white">注册</el-button>
      </div>
      <!--<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
    </el-menu>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        select:'图书',
        input5:'',
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped>
  el-menu{
    width: 1000px;
    border: 1px solid red;
    margin: 0 auto;
  }
</style>

