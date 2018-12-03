<template>
  <div style="background-color:#545c64">
    <el-menu
      style="width: 1200px;margin: 0 auto;
      border-bottom: 1px solid #545c64"
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
      <el-menu-item index="1" v-on:click="jumpTo('/')">图书中心</el-menu-item>
      <el-menu-item index="3">意见栏</el-menu-item>
      <el-menu-item index="2" disabled>广场</el-menu-item>
      <!--<el-menu-item index="3" disabled>消息中心</el-menu-item>-->
      <div style="float: right;margin-top: 10px" v-if="!isLogin">
        <el-button size="small">登录</el-button>
        <el-button type="text" style="color:white">注册</el-button>
      </div>
      <div style="float: right;margin-top: 13px" v-if="isLogin">
        <img src="../assets/logo.png" style="height: 40px;background-color: white;float: left;border-radius: 50%" />
        <el-dropdown>
          <span class="el-dropdown-link">
          <el-button type="text" style="color:white">&nbsp;&nbsp;&nbsp;熊俊伟</el-button>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><span v-on:click="jumpTo('/userCenter')">个人中心</span></el-dropdown-item>
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item><span  v-on:click="logout()">退出</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div style="float: right;margin-top: 16px;">
        <el-input placeholder="请输入内容" size="small" v-model="input5" class="input-with-select" style="width:400px">
          <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:100px">
            <el-option label="图书" value="1"></el-option>
            <el-option label="帖子" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        &nbsp;&nbsp;
        &nbsp;&nbsp;
      </div>

      <!--<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
    </el-menu>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        select: '图书',
        input5: '',
        activeIndex: '1',
        activeIndex2: '1',
        isLogin:true
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      jumpTo: function (s) {
        this.$router.push(s);
      },
      logout:function(){
        this.isLogin=false
      }
    }
  }
</script>
<style scoped>
  el-menu {
    width: 1000px;
    border: 1px solid red;
    margin: 0 auto;
  }
</style>

