import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// vuex
const store = new Vuex.Store({
  state: {
    token: null,
    serverUrl: 'http://192.168.17.187/hqueue/',
    // todo 上传地址 openvod的地址
    upLoadUrl: 'http://mres.cleartv.cn/upload',
    // 记录各个tab的当前Number
    tab: {
         // station页面点击的是那个tab
        tabShowInfoNumber: 0,
        // manage 页面 第几个项目
        tabShowMoudleNum: 0
    }
  },
  mutations: {
    login: (state, data) => {
      localStorage.setItem('token', data)
      state.token = data;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
    },
    changeTab: (state, data) => {
      state.tab[data.whichTab] = data.num
    }
  },
  getters: {
    postUrl(state) {
          return (...url) => {
              let restful = url.join('/')
              return state.serverUrl + restful;
          }
      }
  }
})
export default store

