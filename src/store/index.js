import Vue from 'vue'
import Vuex from 'vuex'
import Lang from '../utils/lang'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: Lang.getLang("isLogin"),
    username:Lang.getLang("username")
  },
  mutations: {
    changeLogin(state, payload) {
      state.isLogin = payload
    },
    changeUser(state, payload) {
      state.username = payload
    }
  },
  // actions: {
  //   login(context, payload) {
  //     context.commit('login', payload)
  //   },
  //   logout(context) {
  //     context.commit('logout')
  //   }
  // }

})

export default store
