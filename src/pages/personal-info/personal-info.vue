<template>
  <div>
    <personal-info-header :title="title" :bgColor="bgColor" :fontColor="fontColor"></personal-info-header>
    <div class="logoContainer">
      <div class="logo" :style="bgImg">
      </div>
      <div class="avatar-box">
        <img class="avatar" @click="avatarClick" :src="iconUrl" v-show="iconUrl">
      </div>
    </div>
    <div class="info-wrapper">
      <div class="item-wrapper border-bottom">
        <span class="item-title">姓名</span>
        <input class="item-input" type="text" v-model="studentName">
      </div>
      <div class="item-wrapper border-bottom">
        <span class="item-title">学校</span>
        <input class="item-input" type="text" v-model="school">
      </div>
      <div class="item-wrapper border-bottom">
        <span class="item-title">性别</span>
        <input class="item-input" type="text" v-model="studentSex">
      </div>
      <div class="item-wrapper border-bottom">
        <span class="item-title">电话</span>
        <input class="item-input" type="text" v-model="studentPhone">
      </div>
      <div class="item-wrapper border-bottom">
        <span class="item-title">Q Q</span>
        <input class="item-input" type="text" v-model="studentQQ">
      </div>
      <div class="item-wrapper border-bottom">
        <span class="item-title">微信</span>
        <input class="item-input" type="text" v-model="studentWx">
      </div>
    </div>
    <div class="button" @click="saveChange">保 存</div>
    <transition name="bounce">
      <avatar-panel v-if="avatarFlag" @closePanel="changeAvatarFlag" @chooseIcon="chooseIcon"></avatar-panel>
    </transition>
    <div id="grey-background" v-show="greyFlag"></div>
  </div>
</template>

<script>
import qs from 'qs'
import PersonalInfoHeader from 'components/header/header'
import AvatarPanel from 'components/avatar-panel/avatar-panel'
import logoImg from '../../../static/images/appLogo.png'
export default {
  name: 'PersonalInfo',
  components: {
    PersonalInfoHeader,
    AvatarPanel
  },
  data () {
    return {
      avatarFlag: false,
      title: '个人信息',
      bgColor: '#409Eff',
      fontColor: '#ffffff',
      school: '',
      schoolId: '',
      studentIcon: '',
      studentName: '',
      studentPhone: '',
      studentQQ: '',
      studentSex: '',
      studentWx: '',
      iconUrl: '',
      bgImg: {
        backgroundImage: 'url(' + logoImg + ')'
      },
      greyFlag: false
    }
  },
  methods: {
    getPersonalInfo () {
      this.axios.post('http://equator8848.xyz:8080/yian2/student/getPersonalInfor.do')
        .then((res) => {
          // console.log(res)
          const data = res.data.data
          if (res.data.status === 1) {
            this.studentIcon = data.studentIcon
            this.studentName = data.studentName
            this.studentPhone = data.studentPhone
            this.studentQQ = data.studentQQ
            this.studentWx = data.studentWx
            this.studentSex = data.studentSex
            this.school = data.school
            this.schoolId = data.schoolId
            this.iconUrl = data.studentIcon
          }
        })
    },
    saveChange () {
      let _this = this
      this.axios.post('http://equator8848.xyz:8080/yian2/student/updateStudentInfor.do', qs.stringify({
        school: parseInt(this.schoolId),
        studentSex: this.studentSex,
        studentPhone: this.studentPhone,
        qq: this.studentQQ,
        wx: this.studentWx,
        studentName: this.studentName
      }))
        .then((res) => {
          if (res.data.status === 1) {
            _this.$layer.closeAll()
            _this.$layer.msg(res.data.msg)
          }
        })
    },
    avatarClick () {
      this.avatarFlag = true
      this.greyFlag = true
    },
    changeAvatarFlag (b) {
      if (b === true) {
        this.avatarFlag = false
        this.greyFlag = false
      }
    },
    chooseIcon (b, url) {
      if (b === true) {
        this.avatarFlag = false
        this.greyFlag = false
        this.iconUrl = url
      }
    }
  },
  mounted () {
    this.getPersonalInfo()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
  .logoContainer
      display flex
      margin 1.22rem .26rem .36rem
      background-color #ffffff
      padding .8rem .4rem
      border-radius .24rem
      .logo
        width 65%
        background-repeat no-repeat
        background-size 100% 100%
        -moz-background-size 100% 100%
        height 1rem
      .avatar-box
        width 35%
        height 1rem
        // background grey
        position relative
        .avatar
          display block
          position relative
          top -0.3rem
          right -0.1rem
          margin 0 auto
          width 1.6rem
          height 1.6rem
          border-radius .8rem
          background-color #FFE1F1
  .info-wrapper
    margin 0 .12rem
    padding .5rem 0 .8rem
    background-color #ffffff
    border-radius .2rem
    .item-wrapper
      display flex
      padding 0 .4rem
      height .84rem
      line-height .84rem
      .item-title
        width 20%
      .item-input
        width 80%
  .button
    margin .4rem auto 0
    width 2.4rem
    background-color $color-theme
    font-size .34rem
    color #ffffff
    padding .2rem 0
    border-radius .2rem
    text-align center
  .bounce-enter-active
    animation bounce-in .5s
  .bounce-leave-active
    animation bounce-in .4s reverse
  @keyframes bounce-in
    0%
      transform scale(0)
    50%
      transform scale(1.2)
    100%
      transform scale(1)
  #grey-background
    position fixed
    top 0
    width 100%
    height 100%
    background-color rgba(0,0,0,0.5)
</style>
