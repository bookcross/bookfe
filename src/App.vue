<template>
  <div id="app" >
    <el-container v-if="$route.meta.keepAlive">
      <el-header style="padding: 0;margin: 0">
        <myNav></myNav>
      </el-header>
      <el-container style="width: 1200px;margin: 0 auto">
        <el-main>
          <el-row :gutter="20"  v-if="$route.meta.rightAlive">
            <el-col :span="16"><div class="grid-content bg-purple">
              <router-view></router-view></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
              <myRight></myRight>
            </div></el-col>

          </el-row>
          <el-row :gutter="20"  v-if="$route.meta.leftAlive">
            <el-col :span="5"><div class="grid-content bg-purple">
              <myLeft></myLeft>
            </div></el-col>
            <el-col :span="19"><div class="grid-content bg-purple">
            <router-view></router-view></div></el-col>
          </el-row>
          <el-row :gutter="20"  v-if="!($route.meta.rightAlive||$route.meta.leftAlive)">
            <el-col><div><router-view></router-view></div></el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>

    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import myNav from './components/Header'
  import myRight from './components/Right'
  import myLeft from './components/Left'

  export default {
    name: 'App',
    components: {
      myNav,myRight,myLeft
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods:{
      jumpTo:function (s) {
        this.$router.push(s);
      }
    }
  }
</script>
