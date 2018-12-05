<template>
  <el-card class="box-card" style="width: 500px;margin: 100px auto">
    <div slot="header" class="clearfix">
      <span>登录</span>
    </div>
    <div>
      <el-input placeholder="用户名" v-model="loginForm.username">
        <template slot="prepend">
          <div style="width: 40px">用户名</div>
        </template>
      </el-input>
      <el-input placeholder="密码" v-model="loginForm.password" style="margin-top: 30px">
        <template slot="prepend">
          <div style="width: 40px">密码</div>
        </template>
      </el-input>
      <el-row style="margin-top: 30px">
        <el-button type="primary" @click="onsubmit">登录</el-button>
        <el-button>注册</el-button>
      </el-row>
      {{message}}
    </div>
  </el-card>
</template>

<script>
  import LangStorage from '../utils/lang'
  import request from '@/utils/request'
  import { Message } from 'element-ui';
  import axios from 'axios'
  import {getToken, setToken} from '../utils/auth'

  export function queryLinkList(form) {
    return request({
      url: '/auth/public',
      headers: {
        'content-type': 'application/json'
      },
      method: 'post',
      data: 'sdf'
    })
  }

  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: '12123',
          password: '123'
        },
        param: ''
      }
    },
    computed: {
      message (){
        return this.$store.state.username
      }
    },
    methods: {
      login: function () {
        queryLinkList(this.loginForm).then(response => {
          console.log(response)
        }).catch((err) => {
          console.log(err)
        })
      },
      onsubmit: function () {//表单提交的事件
        var aaa=this
        //下面append的东西就会到form表单数据的fields中；
        this.param = new FormData();
        this.param.append('username', this.loginForm.username);
        this.param.append('password', this.loginForm.password);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        //然后通过下面的方式把内容通过axios来传到后台
        //下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
        axios.post("/auth/login", this.param, config).then(function (result) {
            if(result.data.restCode=="0000"){
              aaa.$store.commit('changeLogin', true)
              aaa.$store.commit('changeUser', '张三')
              LangStorage.setLang("isLogin",true)
              LangStorage.setLang("username","张三")
              setToken(result.data.data)
              Message({
                message: '登录成功',
                type: 'success'
              });
            }else{
              Message({
                message: '登录失败',
                type: 'error'
              });
            }
        })
      }
    }
  }
</script>

<style scoped>

</style>
