import Vue from 'vue'
import Vuex from 'vuex'
import { reqGetInfo } from '@/api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: {},
    fale: true,
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
  },
  modules: {},
})
