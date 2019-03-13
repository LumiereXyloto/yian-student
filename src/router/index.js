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
import PersonalInfo from 'pages/personal-info/personal-info'
import MyParttimejob from 'pages/my-parttimejob/my-parttimejob'
import MyPreference from 'pages/preference/preference'
import Feedback from 'pages/feedback/feedback'
import Certification from 'pages/certification/certification'
import ChangePassword from 'pages/change-password/change-password'
import ForgetPassword from 'pages/change-password/forget-password'

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
      path: '/evaluation',
      name: 'Evaluation',
      component: Evaluation
    },
    {
      path: '/personal-info',
      name: 'PersonalInfo',
      component: PersonalInfo
    },
    {
      path: '/my-parttimejob',
      name: 'MyParttimejob',
      component: MyParttimejob
    },
    {
      path: '/preference',
      name: 'Preference',
      component: MyPreference
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/certification',
      name: 'Certification',
      component: Certification
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/forget-password/:uid',
      name: 'ForgetPassword',
      component: ForgetPassword
    }
  ]
})
