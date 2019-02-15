import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Message from '@/pages/message/message'
import Personal from '@/pages/personal/personal'

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
    }
  ]
})
