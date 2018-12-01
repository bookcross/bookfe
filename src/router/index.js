import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/view/Home'
import BookDetail from '@/view/BookDetail'

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
        keepAlive:true
      }
    },
    {
      path: '/bookDetail',
      name: 'BookDetail',
      component: BookDetail,
      meta:{
        keepAlive:true
      }
    }
  ]
})
