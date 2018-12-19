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
      <el-form-item label="移动电话：" prop="phone">
        <el-input v-model="ruleForm.phone" style='width:200px'></el-input>
      </el-form-item>
      <el-form-item label="微信：">
        <el-input v-model="ruleForm.wxnumber" style='width:200px'></el-input>
      </el-form-item>
      <el-form-item label="头像：">
        <el-upload
          style="width: 150px"
          v-loading="loading2"
          class="avatar-uploader"
          :action=getUploadUrl()
          method:="post"
          :show-file-list="false"
          :on-error="handleAvatarerror"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.userlogo" :src="ruleForm.userlogo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"
             style="border: 1px solid"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changeUserInfo">修改资料</el-button>
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
  import request from '@/utils/request'
  export function getUserInfo(){
    return request({
      url: '/auth/user/getUser',
      headers: {
        'content-type': 'application/json'
      },
      method: 'post'
    })
  }

  export function updateUserInfo(form){
    return request({
      url: '/auth/user/updateUser',
      headers: {
        'content-type': 'application/json'
      },
      method: 'post',
      data:form
    })
  }
  export default {
    name: "UserSetting",
    mounted(){
      getUserInfo().then(response=>{
        this.ruleForm.userlogo=response.data.userlogo
        this.ruleForm.username=response.data.username
        this.ruleForm.wxnumber=response.data.wxnumber
        this.ruleForm.phone=response.data.phone
      }).catch(err=>{console.log(err)})
    },
    methods: {
      changeUserInfo(){
        updateUserInfo(this.ruleForm)
      },
      getIcon(fileName){
        var fileExtend='';
        if(fileName!=null){
          fileExtend=fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
        }
        console.log(fileExtend)
        if(fileExtend=='.jpg'||fileExtend=='.png'||fileExtend=='.jpeg'||fileExtend=='.bmp'||fileExtend=='.gif'){
          return "success"
        }
        else {
          return "error"
        }
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getUploadUrl: function () {
        return process.env.BASE_API + "/zuul/file/upload"
      },
      handleAvatarSuccess(res, file) {
        if(res.restCode=="0000"){
          this.ruleForm.userlogo = res.data
          this.loading2=false
        }else{
          this.$message({
            message: res.code,
            type: 'error'
          })
          this.loading2=false
        }
      },
      handleAvatarerror(res){
        this.$message({
          message: '网络错误',
          type: 'error'
        })
        this.loading2=false
      },
      beforeAvatarUpload(file) {
        console.log(file.type)
        var isJPG =true
        this.loading2=true
        const isLt2M = file.size / 1024 / 1024 < 1;
        if( this.getIcon(file.name)=='error'){
          isJPG = false
          this.$message.error('格式必须为.gif .png .jpg .jpeg .bmp');
          this.loading2=false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
          this.loading2=false
        }
        return isJPG && isLt2M;
      }
    },
    data() {
      return {
        loading2:false,
        dialogFormVisible: false,
        ruleForm: {
          username: '',
          userlogo: '',
          phone: '',
          wxnumber: '',
        },
        rules: {
          username: [
            {required: true, message: '输入用户名', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '输入电话号码', trigger: 'blur'},
            {min: 11, max: 11, message: '电话长度不对', trigger: 'blur'}
          ],
        }
      }
    }
  }
</script>

<style scoped>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }

  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
</style>
