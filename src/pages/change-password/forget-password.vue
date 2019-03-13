<template>
  <div class="wrapper">
    <change-header :title="title" :bgColor="bgColor" :fontColor="fontColor"></change-header>
    <span>新密码：</span>
    <div class="newPassword">
      <input type="password" v-model="newPwd">
    </div>
    <span>验证码：</span>
    <div class="code">
      <input type="text" v-model="code">
    </div>
    <div class="getCode" @click="getCode" ref="text">点击获取验证码</div>
    <div class="confirmButton" @click="resetPassword">确 定</div>
  </div>
</template>

<script>
import ChangeHeader from 'components/header/header'
import qs from 'qs'
export default {
  name: 'ChangePassword',
  components: {
    ChangeHeader
  },
  data () {
    return {
      title: '找回密码',
      bgColor: '#409Eff',
      fontColor: '#ffffff',
      code: '',
      newPwd: '',
      uid: '',
      flag: true
    }
  },
  methods: {
    checkInput () {
      if (this.code && this.newPwd) {
        return true
      } else {
        this.$layer.closeAll()
        this.$layer.msg('请先输入密码和验证码！')
        return false
      }
    },
    resetPassword () {
      if (this.checkInput()) {
        // console.log(this.oldPwd, this.newPwd)
        this.axios.post('http://equator8848.xyz:8080/yian2/email/resetPsw.do', qs.stringify({
          uid: this.uid,
          newPwd: this.newPwd,
          authCode: this.code
        }))
          .then((res) => {
            if (res.status === 200) {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      }
    },
    time () {
      this.flag = false
      clearInterval(this.timer)
      let _this = this
      let wait = 59
      if (wait === 0) {
        this.$refs.text.innerText = '点击获取验证码'
        wait = 59
      } else {
        this.timer = setInterval(function () {
          _this.$refs.text.innerText = wait + '秒后再次获取'
          wait--
          if (wait === 0) {
            _this.flag = true
            _this.$refs.text.innerText = '点击获取验证码'
            clearInterval(_this.timer)
          }
        }, 1000)
      }
    },
    getCode () {
      if (this.flag) {
        this.axios.post('http://equator8848.xyz:8080/yian2/email/retrievePsw.do', qs.stringify({
          emailAddress: this.uid
        }))
          .then((res) => {
            if (res.status === 200) {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      }
      this.time()
    },
    getUid () {
      this.uid = this.$route.params.uid
    }
  },
  mounted () {
    this.getUid()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles'
span
  display block
  margin .4rem 0 .14rem
  font-size .28rem
input
  width 100%
  font-size .32rem
  padding 0 .2rem
  letter-spacing .02rem
.wrapper
  margin 1.4rem .12rem
  .newPassword
    background-color #fff
    display flex
    height .7rem
    line-height .7rem
    border-radius .1rem
    overflow hidden
  .code
    background-color #fff
    display flex
    height .7rem
    line-height .7rem
    border-radius .1rem
    overflow hidden
  .confirmButton
    background-color $color-theme
    color #ffffff
    height .7rem
    line-height .7rem
    text-align center
    margin .6rem .4rem
    border-radius .1rem
  .getCode
    margin-top .4rem
    text-align center
    font-size .28rem
    color $color-theme
    text-decoration underline
</style>
