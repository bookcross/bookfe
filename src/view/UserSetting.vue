<template>
  <div>
    <el-alert
      title="为了方便您的图书被人找到，请尽量完善自己的个人信息。在这个平台里，您的个人信息不会被滥用，
            只会对有意向借书并付出书币的用户获取到，同一时间最多只有一个用户能获取到您的联系方式。"
      type="success">
    </el-alert>
    <br/>
    <el-form :model="ruleForm" :rules="rules" label-width="100px">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="ruleForm.username" style='width:200px'></el-input>
      </el-form-item>
      <el-form-item label="移动电话：" prop="phoneNum">
        <el-input v-model="ruleForm.phoneNum" style='width:200px'></el-input>
      </el-form-item>
      <el-form-item label="微信：">
        <el-input v-model="ruleForm.phoneNum" style='width:200px'></el-input>
      </el-form-item>
      <el-form-item label="头像：" prop="userImg">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改资料</el-button>
        <el-button type="warning" @click="dialogFormVisible = true">修改密码</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="400px">
      <el-form label-width="80px">
        <el-form-item label="原密码">
          <el-input type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "UserSetting",
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        ruleForm: {
          username: '',
          userImg: '',
          phoneNum: '',
          weiNum: '',
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
