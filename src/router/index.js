import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/view/Home'
import BookDetail from '@/view/BookDetail'
import UserCenter from '@/view/UserCenter'
import BookEdit from '@/view/BookEdit'
import Login from '@/view/Login'
import Register from '@/view/Register'
import NewsCenter from '@/view/NewsCenter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        keepAlive:true,//是否属于正常页面
        leftAlive:false,//是否拥有左边栏目
        rightAlive:true//是否拥有右边栏目
      }
    },
    {
      path: '/bookDetail',
      name: 'BookDetail',
      component: BookDetail,
      meta:{
        keepAlive:true,//是否属于正常页面
        leftAlive:false,//是否拥有左边菜单栏目
        rightAlive:true//是否拥有右边栏目
      }
    },
    {
      path: '/userCenter',
      name: 'UserCenter',
      component: UserCenter,
      meta:{
        keepAlive:true,//是否属于正常页面
        leftAlive:true,//是否拥有左边菜单栏目
        rightAlive:false//是否拥有右边栏目
      }
    },
    {
      path: '/bookEdit',
      name: 'BookEdit',
      component: BookEdit,
      meta:{
        keepAlive:true,//是否属于正常页面
        leftAlive:true,//是否拥有左边菜单栏目
        rightAlive:false//是否拥有右边栏目
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta:{
        keepAlive:true,//是否属于正常页面
        leftAlive:false,//是否拥有左边菜单栏目
        rightAlive:false//是否拥有右边栏目
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta:{
        keepAlive:true,//是否属于正常页面
        leftAlive:false,//是否拥有左边菜单栏目
        rightAlive:false//是否拥有右边栏目
      }
    },
    {
      path: '/NewsCenter',
      name: 'NewsCenter',
      component: NewsCenter,
      meta:{
        keepAlive:true,//是否属于正常页面
        leftAlive:true,//是否拥有左边菜单栏目
        rightAlive:false//是否拥有右边栏目
      }
    },
  ]
})
