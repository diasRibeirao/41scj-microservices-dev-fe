import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tipoUsuario: '',
    usuario: []
  },
  mutations: {
    updateTipoUsuario(state, value) {
      state.tipoUsuario = value;
    },
    updateUsuario(state, value) {
      state.usuario = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
