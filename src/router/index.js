import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/Init/Index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Init/Login.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../views/Account/ForgotPassword.vue')
  },
  {
    path: '/confirm-forgot-password',
    name: 'confirm-forgot-password',
    component: () => import('../views/Account/ConfirmForgotPassword.vue')
  },
  {
    path: '/redefine-password',
    name: 'redefine-password',
    component: () => import('../views/Account/RedefinePassword.vue')
  },  
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register/Register.vue')
  },
  {
    path: '/confirm-register',
    name: 'confirm-register',
    component: () => import('../views/Register/ConfirmRegister.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home/Home.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
