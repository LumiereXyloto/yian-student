<template>
  <div class="wrapper">
    <div class="header-info">
      <img src="@/assets/images/welcome.png">
    </div>
    <div class="input-wrapper">
      <div class="icon-wrapper">
        <input class="input" v-model="list.uid" type="text" placeholder="输入邮箱地址作为账号" @blur="checkEmail">
        <img src="@/assets/images/uid.png">
      </div>
      <div class="icon-wrapper">
        <input class="input" v-model="list.ps" type="password" placeholder="请设置密码(6-16位)" @blur="checkPs">
        <img src="@/assets/images/pwd.png">
      </div>
      <div class="icon-wrapper">
        <input class="input" v-model="list.psw" type="password" placeholder="请确认密码" @blur="checkPsw">
        <img src="@/assets/images/pwd.png">
      </div>
      <div class="icon-wrapper">
        <input class="input" v-model="list.schoolName" type="text" placeholder="点击选择学校" @focus="clickTrigger">
        <img src="@/assets/images/pwd.png">
      </div>
      <div class="icon-wrapper">
        <input class="input code-input" v-model="list.authCode" type="text" placeholder="请输入验证码">
        <img src="@/assets/images/pwd.png">
      </div>
      <div class="code" @click="flag && sendCode()" ref="text">点击获取验证码</div>
    </div>
    <div class="login-button" @click="sendInfo">注册</div>
    <!-- <div class="footer-info">
      <span>注册即同意</span>
      <span class="color-text">《易安兼职使用协议》</span>
      <span>&</span>
      <span class="color-text">《隐私权条款》</span>
    </div> -->
    <div class="footer-info">
      <img src="@/assets/images/school.png">
    </div>
    <div id="trigger1" ref="trigger"></div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import MobileSelect from 'mobile-select'
export default {
  name: 'Register',
  data () {
    return {
      list: {
        uid: '',
        ps: '',
        psw: '',
        authCode: '',
        schoolName: '',
        schoolId: ''
      },
      schools: [],
      flag: true
    }
  },
  methods: {
    sendInfo () {
      if (this.list.uid && this.list.ps && this.list.psw && this.list.authCode && this.list.schoolName) {
        console.log(this.list)
        axios.post('http://equator8848.xyz:8080/yian2/student/register.do', qs.stringify({
          userId: this.list.uid,
          pwd: this.list.psw,
          authCode: this.list.authCode,
          schoolId: this.list.schoolId
        }), {
          withCredentials: true
        })
          .then(this.sendInfoSucc)
      } else {
        this.$layer.closeAll()
        this.$layer.msg('请完善注册信息')
      }
    },
    sendInfoSucc (res) {
      if (res.data.status === 2000) {
        this.$layer.closeAll()
        this.$layer.msg(res.data.msg)
        this.$router.push('/login')
      } else if (res.data.status === 4001) {
        this.$layer.closeAll()
        this.$layer.msg(res.data.msg)
      } else {
        console.log(res)
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
    sendCode () {
      let email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g// eslint-disable-line
      if (email.test(this.list.uid)) {
        this.time()
        axios.post('http://equator8848.xyz:8080/yian2/email/register.do', qs.stringify({
          emailAddress: this.list.uid
        }))
          .then((res) => {
            if (res.data.status === 1) {
              this.$layer.closeAll()
              this.$layer.msg(res.data.msg)
            }
          })
      } else {
        this.$layer.closeAll()
        this.$layer.msg('请输入正确的邮箱')
        return false
      }
    },
    checkEmail () {
      if (this.list.uid) {
        let email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g// eslint-disable-line
        if (email.test(this.list.uid)) {
          axios.post('http://equator8848.xyz:8080/yian2/student/uniquit.do', qs.stringify({
            uid: this.list.uid
          }))
            .then((res) => {
              if (res.data.status === 4003) {
                this.$layer.closeAll()
                this.$layer.msg(res.data.msg)
              }
            })
          return true
        } else {
          this.$layer.closeAll()
          this.$layer.msg('账号不符合规则')
          return false
        }
      } else {
        return false
      }
    },
    checkPs () {
      if (this.list.ps) {
        if (this.list.ps.length < 6) {
          this.$layer.closeAll()
          this.$layer.msg('密码不能少于6位')
          return false
        }
        if (this.list.ps.length > 16) {
          this.$layer.closeAll()
          this.$layer.msg('密码不能多于16位')
          return false
        }
        return true
      }
    },
    checkPsw () {
      if (this.list.ps !== '' && this.list.psw != '' && this.list.psw !== this.list.ps) {// eslint-disable-line
        this.$layer.closeAll()
        this.$layer.msg('两次密码输入不一致')
        return false
      }
    },
    createTrigger () {
      let _this = this
      var mobileSelect1 = new MobileSelect({ // eslint-disable-line
        trigger: '#trigger1',
        title: '选择学校',
        wheels: [
          {data: _this.schools}
        ],
        position: [1], // 初始化定位
        callback: function (indexArr, data) {
          _this.list.schoolName = data[0].value // 返回选中的json数据
          _this.list.schoolId = data[0].id
        }
      })
    },
    clickTrigger () {
      this.$refs.trigger.click()
    },
    getSchools () {
      let _this = this
      axios.get('http://www.equator8848.xyz:8080/yian2/school/getSchoolList.do', qs.stringify({
        pageNum: '',
        pageSize: ''
      }))
        .then((res) => {
          let normalRes = this.handleSchools(res.data.data.list)
          _this.schools = normalRes
          _this.createTrigger()
        })
    },
    handleSchools (list) {
      let ret = []
      for (let i = 0; i < list.length; i++) {
        let a = {}
        a.id = list[i].code
        a.value = list[i].name
        ret.push(a)
      }
      return ret
    }
  },
  mounted () {
    this.getSchools()
  },
  beforeDestroy () {
    clearInterval(this.timer)
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
    padding .2rem 0
    margin .3rem 0
    background-color #ffffff
    text-align center
    color #ffffff
    font-size .3rem
    img
      width 80%
      height auto
      image-rendering: -moz-crisp-edges; /* Firefox */
      image-rendering: -o-crisp-edges; /* Opera */
      image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
  .input-wrapper
    text-align center
    .input
      width 75%
      border-bottom: .02rem solid #CECECE
      padding: .2rem .2rem .06rem .9rem
      margin: .24rem .4rem
    .code
      color $color-theme
      text-decoration underline
      text-align center
      padding-right .2rem
  .login-button
    margin: .4rem
    margin-top: .7rem
    color: #ffffff
    background-color $color-theme
    height .8rem
    line-height .8rem
    text-align center
    border-radius .1rem
  .footer-info
    position fixed
    bottom .2rem
    text-align center
    img
      width 95%
  #trigger1
    display none
  .icon-wrapper
    position relative
    img
      position absolute
      left .7rem
      top .3rem
      width .4rem
</style>
