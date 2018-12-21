<template>
  <div>
    <template>
      <el-tabs :activeName="activeLabel" @tab-click="handleClick">
        <el-tab-pane label="个人信息" name="first">
          <user-setting></user-setting>
        </el-tab-pane>
        <el-tab-pane label="我的图书" name="second">
          <user-book></user-book>
        </el-tab-pane>
        <el-tab-pane label="我的收藏" name="third">
          <user-collection></user-collection>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
  import UserSetting from './UserSetting'
  import UserBook from './UserBook'
  import UserCollection from './UserCollection'
  export default {
    name: "UserCenter",
    components: {
      UserSetting,UserBook,UserCollection
    },
    methods:{
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      jumpTo: function (s) {
        this.$router.push(s);
      }
    },
    mounted(){
      // console.log(this.$route.params.activeLabel)
    },
    data() {
      return {
        activeLabel:'first',
        dialogFormVisible:false,
        ruleForm: {
          username: '',
          userImg: '',
          phoneNum:'',
          weiNum:'',
        },
        rules: {
          username: [
            {required: true, message: '输入用户名', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          phoneNum: [
            {required: true, message: '输入电话号码', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
        }
      }
    }
  }
</script>

<style scoped>

</style>
