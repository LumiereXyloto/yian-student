<template>
  <div class="wrapper">
    <change-header :title="title" :bgColor="bgColor" :fontColor="fontColor"></change-header>
    <span>原密码：</span>
    <div class="oldPassword">
      <input type="password" v-model="oldPwd">
    </div>
    <span>新密码：</span>
    <div class="newPassword">
      <input type="password" v-model="newPwd">
    </div>
    <div class="forget" @click="toForgetPage">忘记密码？</div>
    <div class="confirmButton" @click="changePassword">确 定</div>
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
      title: '修改密码',
      bgColor: '#409Eff',
      fontColor: '#ffffff',
      oldPwd: '',
      newPwd: '',
      uid: ''
    }
  },
  methods: {
    checkInput () {
      if (this.oldPwd && this.newPwd) {
        if (this.oldPwd === this.newPwd) {
          this.$layer.closeAll()
          this.$layer.msg('新密码不能与原密码相同！')
          return false
        } else {
          return true
        }
      } else {
        this.$layer.closeAll()
        this.$layer.msg('请完整输入新旧密码！')
        return false
      }
    },
    changePassword () {
      if (this.checkInput()) {
        // console.log(this.oldPwd, this.newPwd)
        this.axios.post('http://equator8848.xyz:8080/yian2/student/changePwd.do', qs.stringify({
          uid: this.uid,
          oldPwd: this.oldPwd,
          newPwd: this.newPwd
        }))
          .then((res) => {
            if (res.status === 200) {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      }
    },
    getUid () {
      this.axios.get('http://equator8848.xyz:8080/yian2/student/getPersonalInfor.do')
        .then((res) => {
          if (res.data.status === 1) {
            this.uid = res.data.data.stuentId
          }
        })
    },
    toForgetPage () {
      this.$router.push(`/forget-password/${this.uid}`)
    }
  },
  mounted () {
    this.getUid()
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
  .oldPassword
    background-color #fff
    display flex
    height .7rem
    line-height .7rem
    border-radius .1rem
    overflow hidden
  .newPassword
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
  .forget
    margin-top .4rem
    text-align center
    font-size .28rem
    color $color-theme
    text-decoration underline
</style>
