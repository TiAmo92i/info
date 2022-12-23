import Vue from 'vue'
import Vuex from 'vuex'
import { reqGetInfo, reqGetMyList } from '@/api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: {},
    fale: true,
    myList: {},
    imgUrls: [],
  },
  getters: {},
  mutations: {
    GETLIST(state, list) {
      state.list = list
    },
    SENDCOMMENT(state, flag) {
      state.flag = flag
    },
    USERNAME(state, userName) {
      state.userName = userName
    },
    GETMYLIST(state, myList) {
      state.myList = myList
    },
  },
  actions: {
    async getList({ commit }, id) {
      const result = await reqGetInfo(id)
      if (result.code === 200) {
        commit('GETLIST', result.data)
      }
    },
    userName({ commit }, userName) {
      commit('USERNAME', userName)
    },
    async getMyList({ commit }, author) {
      const result = await reqGetMyList(author)
      if (result.code === 200) {
        commit('GETMYLIST', result.data)
      }
    },
  },
  modules: {},
})
