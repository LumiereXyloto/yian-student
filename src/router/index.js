import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Message from '@/pages/message/message'
import Personal from '@/pages/personal/personal'
import Login from 'pages/login/login'
import Register from 'pages/register/register'
import Detail from 'pages/detail/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          name: 'detail',
          path: ':id',
          component: Detail
        }
      ]
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
