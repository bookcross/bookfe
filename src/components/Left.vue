<template>
  <div>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    style="min-height: 400px"
    text-color="#fff"
    active-text-color="#ffd04b">
    <!--style="height: 1200px;border: 1px solid;margin-top: 0;padding-top: 0"-->

    <el-menu-item index="1"  v-on:click="jumpTo('/userCenter')">
      <i class="el-icon-menu"></i>
      <span slot="title">个人中心</span>
    </el-menu-item>
    <el-menu-item index="2" v-on:click="jumpTo('/')">
      <i class="el-icon-menu"></i>
      <span slot="title">消息通知</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-menu" v-on:click="jumpTo('/')"></i>
      <span slot="title" >书评管理</span>
    </el-menu-item>
    <!--<el-menu-item index="3" disabled>-->
      <!--<i class="el-icon-document"></i>-->
      <!--<span slot="title">导航三</span>-->
    <!--</el-menu-item>-->
    <!--<el-menu-item index="4">-->
      <!--<i class="el-icon-setting"></i>-->
      <!--<span slot="title">导航四</span>-->
    <!--</el-menu-item>-->
  </el-menu>
  </div>
</template>

<script>
    export default {
        name: "Left",
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        jumpTo: function (s) {
          this.$router.push(s);
        }
      }
    }
</script>

<style scoped>

</style>
