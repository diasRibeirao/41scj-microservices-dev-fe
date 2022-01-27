import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from "bootstrap-vue";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import pt_BR from 'vee-validate/dist/locale/pt_BR';
import * as rules from "vee-validate/dist/rules";
import VueLoading from 'vuejs-loading-plugin'
import VueSimpleAlert from "vue-simple-alert";
import VueMask from 'v-mask';

import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("pt_BR", pt_BR);

// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.use(BootstrapVue);
Vue.use(VueLoading, {
  dark: true, // default false
  text: 'Carregando', // default 'Loading'
  loading: true, // default false
  background: 'rgb(255,255,255)', // set custom background
})
Vue.use(VueSimpleAlert);
Vue.use(VueMask);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
