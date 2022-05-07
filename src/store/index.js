import Vue from 'vue'
import Vuex from 'vuex'
import { reqGetInfo, reqSendComment } from '@/api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: {},
  },
  getters: {},
  mutations: {
    GETLIST(state, list) {
      state.list = list
    },
  },
  actions: {
    async getList({ commit }, id) {
      const result = await reqGetInfo(id)
      if (result) {
        commit('GETLIST', result)
      }
    },
    async sendComment({ commit }, { input, seq }) {
      console.log(input, seq)
      await reqSendComment(input, seq)
    },
  },
  modules: {},
})
