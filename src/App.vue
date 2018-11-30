<template>
  <div id="app" >
    <el-container>
      <el-header style="padding: 0;margin: 0">
        <myNav></myNav>
      </el-header>
      <el-container style="width: 1200px;margin: 0 auto">

        <el-main >
        <el-row :gutter="20"  >
          <el-col :span="16"><div class="grid-content bg-purple">
            <router-view></router-view></div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">
            <myRight></myRight>
          </div></el-col>
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

  export default {
    name: 'App',
    components: {
      myNav,myRight
    },
    data() {
      return {
        isRouterAlive: true
      }
    }
  }
</script>
