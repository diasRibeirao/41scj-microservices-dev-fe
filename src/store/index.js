import Vue from 'vue'
import Vuex from 'vuex'
import { api } from "@/services.js";

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    role: '',
    usuario: {
      id: '',
      nome: '',
      sobrenome: '',
      email: '',
      login: '',
      telefone: '',
      situacao: '',
      roles: []
    }
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_ROLE(state, payload) {
      state.role = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    },
  },
  actions: {    
    GET_USUARIO(context, payload) {
      return api.get(`/usuarios/${payload}`)
      .then(response => {
        context.commit("UPDATE_USUARIO", response.data);
        context.commit("UPDATE_LOGIN", true);
        window.localStorage.usuario = JSON.stringify(response.data);
      });
    },
    SET_USUARIO(context, payload) {
      context.commit("UPDATE_USUARIO", payload);
      context.commit("UPDATE_LOGIN", true);
      window.localStorage.usuario = JSON.stringify(payload);
    },
    SET_ROLE(context, payload) {
      context.commit("UPDATE_ROLE", payload);
      window.localStorage.role = payload;
    },
    criarUsuario(context, payload) {
      return api.post("/usuarios", payload);
    },
    DESLOGAR_USUARIO(context) {
      context.commit("UPDATE_USUARIO", {
        id: '',
        nome: '',
        sobrenome: '',
        email: '',
        login: '',
        telefone: '',
        situacao: '',
        roles: []
        });
       
      context.commit("UPDATE_LOGIN", false);
      context.commit("UPDATE_ROLE", '');
      window.localStorage.removeItem("usuario");
    }
  },
  modules: {
  }
})
