import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tipoUsuario: ''
  },
  mutations: {
    updateTipoUsuario(state, value) {
      state.tipoUsuario = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
