import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Message from '@/pages/message/message'
import Personal from '@/pages/personal/personal'
import Login from 'pages/login/login'
import Register from 'pages/register/register'
import Detail from 'pages/detail/detail'
import MessageDetail from 'pages/message-detail/message-detail'
import Evaluation from 'pages/evaluation/evaluation'

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
      component: Home
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
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/message/:messageId',
      name: 'MessageDetail',
      component: MessageDetail
    },
    {
      path: '/evaluation/:merchantId',
      name: 'Evaluation',
      component: Evaluation
    }
  ]
})
