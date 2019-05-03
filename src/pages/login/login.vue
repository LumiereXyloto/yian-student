<template>
  <div class="wrapper">
    <div class="header-info">
      <router-link to="/register">
        <div class="info">注册</div>
      </router-link>
    </div>
    <div class="logo-wrapper">
      <img class="logo" src="@/assets/images/yian.png" alt="gg">
    </div>
    <div class="input-wrapper">
      <div class="icon-input-wrapper">
        <input class="input" type="text" placeholder="用户邮箱" v-model="list.uid">
        <img src="@/assets/images/uid.png" alt="gg">
      </div>
      <div class="icon-input-wrapper">
        <input class="input" type="password" placeholder="请填写密码" v-model="list.psw">
        <img src="@/assets/images/pwd.png" alt="gg">
      </div>
      <div class="isRememberPsw">
        <span class="checkbox-title">记住密码</span>
        <input v-model="isRememberPsw" id="color-input-blue" class="chat-button-location-radio-input" type="checkbox" name="color-input-blue"/>
        <label for="color-input-blue"></label>
      </div>
    </div>
    <div class="login-button" @click="sendInfo">登录</div>
    <div class="footer-info">
      <span>登录即同意</span>
      <span class="color-text">《易安兼职使用协议》</span>
      <span>&</span>
      <span class="color-text">《隐私权条款》</span>
    </div>
    <div class="footer-info">
      <span>还没账号？</span>
      <router-link to="/register">
        <span class="color-text font-underline">立即注册</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
  name: 'Login',
  data () {
    return {
      list: {
        uid: '',
        psw: ''
      },
      isRememberPsw: true
    }
  },
  methods: {
    sendInfo () {
      let email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g// eslint-disable-line
      if (this.list.uid === '' || this.list.psw === '') {
        this.$layer.closeAll()
        this.$layer.msg('账号/密码不能为空')
      } else if (email.test(this.list.uid)) {
        // console.log(this.isRememberPsw)// 记住密码
        axios.post('http://equator8848.xyz:8080/yian2/student/login.do', qs.stringify({
          userId: this.list.uid,
          pwd: this.list.psw
        }), {
          withCredentials: true
        })
          .then(this.sendInfoSucc)
      } else {
        this.$layer.closeAll()
        this.$layer.msg('账号有误')
      }
    },
    sendInfoSucc (res) {
      // console.log(res)
      // sessionStorage.setItem('uid', this.uid)
      if (res.data.status === 4005) {
        this.$layer.closeAll()
        this.$layer.msg(res.data.msg)
        this.list.psw = ''
      } else if (res.data.status === 4000) {
        // 向Vuex中存储用户信息
        this.$store.commit('loginState', res.data.data)
        this.$router.replace('/home')
        this.$layer.closeAll()
        this.$layer.msg(res.data.msg)
        if (this.isRememberPsw === true) {
          // console.log('checked === true')
          this.setStorage(this.list.uid, this.list.psw)
        } else {
          // console.log('清空Cookie')
          this.clearStorage()
        }
      } else {
        this.$layer.closeAll()
        this.$layer.msg('登录失败')
      }
    },
    // checkCheckboxValue () {
    //   setTimeout(() => {
    //     console.log(this.isRememberPsw)
    //   }, 17)
    // },
    // setCookie (uid, psw, exdays) {
    //   let exdate = new Date()
    //   exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)// 保存的天数
    //   window.document.cookie = `uid = ${uid}; path = /; expires = ${exdate.toGMTString()}`
    //   window.document.cookie = `psw = ${psw}; path = /; expires = ${exdate.toGMTString()}`
    // },
    // getCookie () {
    //   if (document.cookie.length > 0) {
    //     // console.log(document.cookie) eg:uid=740207968@qq.com; psw=123456
    //     var arr = document.cookie.split('; ')
    //     for (var i = 0; i < arr.length; i++) {
    //       var arr2 = arr[i].split('=')// 再次切割
    //       // 判断查找相对应的值
    //       if (arr2[0] === 'uid') {
    //         this.list.uid = arr2[1]// 保存到保存数据的地方
    //       } else if (arr2[0] === 'psw') {
    //         this.list.psw = arr2[1]
    //       }
    //     }
    //   }
    // },
    // clearCookie () {
    //   this.setCookie('', '', -1)// 修改2值都为空，天数为负1天就好了
    // },
    setStorage (uid, psw) {
      window.localStorage.setItem('uid', `${uid}`)
      window.localStorage.setItem('psw', `${psw}`)
    },
    getStorage () {
      this.list.uid = window.localStorage.getItem('uid')
      this.list.psw = window.localStorage.getItem('psw')
    },
    clearStorage () {
      window.localStorage.clear()
    }
  },
  mounted () {
    this.getStorage()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles'
  input::-webkit-input-placeholder{
    color: $color-input-grey
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: $color-input-grey
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: $color-input-grey
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color: $color-input-grey
  }
  .wrapper
    position fixed
    width 100%
    height 100%
    background-color #fff
  .header-info
    display: flex
    justify-content: flex-end
    .info
      margin .3rem
  .logo-wrapper
    display: flex
    justify-content: center
    margin-top: .8rem
    .logo
      width: 4.4rem
      height: 1.3rem
  .input-wrapper
    display: flex
    flex-direction: column
    .icon-input-wrapper
      position relative
      text-align center
      img
        position absolute
        width .4rem
        left .6rem
        top .74rem
    .input
      width 75%
      border-bottom: .02rem solid #CECECE
      padding: .2rem .2rem .1rem .8rem
      margin: .4rem
      margin-top: .6rem
      font-size $font-size-medium
    .isRememberPsw
      margin-top .1rem
      display flex
      justify-content center
      .checkbox-title
        color $color-input-grey
      #color-input-blue +label{
        display: block
        width: .28rem
        height: .28rem
        cursor: pointer
        background: #ffffff
        border-radius .08rem
        border .02rem solid #CECECE
      }
      #color-input-blue:checked +label::before{
        display: block
        content: "\2714"
        text-align: center
        color: $color-theme
      }
      input[type=checkbox]{
        visibility: hidden
      }
  .login-button
    margin: .4rem
    margin-top: .6rem
    color: #ffffff
    background-color $color-theme
    height .8rem
    line-height .8rem
    text-align center
    border-radius .1rem
  .footer-info
    display flex
    justify-content center
    margin-top 1rem
    font-size $font-size-small-x
    .color-text
      color $color-theme
    .font-underline
      text-decoration underline
</style>
