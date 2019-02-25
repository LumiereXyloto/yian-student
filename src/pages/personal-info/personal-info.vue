<template>
  <div class="bgi">
    <div>
      <div
        @click="goBack()"
        class="header-abs"
        v-show="showAbs"
      >
        <div class="iconfont header-abs-back">&#xe624;</div>
      </div>
    </div>

    <div class="banner">
      <img src="@/assets/images/banner.png" alt="gg">
    </div>

    <div v-show="showBlock">
      <div class="show-block">
        <div class="title">我的个人资料</div>
        <div class="content-wrapper">
          <div class="item-title">账号</div>
          <div class="item-detail">{{list.stuentId}}</div>
        </div>
        <hr>
        <div class="content-wrapper">
          <div class="item-title">学校</div>
          <div class="item-detail">{{list.school}}</div>
        </div>
        <hr>
        <div class="content-wrapper">
          <div class="item-title">姓名</div>
          <div class="item-detail">{{list.studentName}}</div>
        </div>
        <hr>
        <div class="content-wrapper">
          <div class="item-title">性别</div>
          <div class="item-detail">{{list.studentSex}}</div>
        </div>
        <hr>
        <div class="content-wrapper">
          <div class="item-title">电话</div>
          <div class="item-detail">{{list.studentPhone}}</div>
        </div>
        <hr>
        <div class="content-wrapper">
          <div class="item-title">微信</div>
          <div class="item-detail">{{list.studentWx}}</div>
        </div>
        <hr>
      </div>
      <div class="change-button" @click="showBlock=!showBlock">修改个人资料</div>
    </div>

    <div v-show="!showBlock">
      <div class="show-block1">
        <div class="title1">我的个人资料</div>
        <!-- <div class="content-wrapper1">
          <div class="item-title1">学校</div>
          <input class="item-detail1" type="text" :placeholder="list.school" v-model="this.changeList.school">
        </div>
        <hr> -->
        <div class="content-wrapper1">
          <div class="item-title1">姓名</div>
          <input class="item-detail1" type="text" :placeholder="list.studentName"  v-model="changeList.studentName">
        </div>
        <hr>
        <div class="content-wrapper1">
          <div class="item-title1">性别</div>
          <input class="item-detail1" type="text" :placeholder="list.studentSex"  v-model="changeList.studentSex">
        </div>
        <hr>
        <div class="content-wrapper1">
          <div class="item-title1">电话</div>
          <input class="item-detail1" type="text" :placeholder="list.studentPhone"  v-model="changeList.studentPhone">
        </div>
        <hr>
        <div class="content-wrapper1">
          <div class="item-title1">联系</div>
          <input class="item-detail1" type="text" :placeholder="list.studentWx" v-model="changeList.studentWx">
        </div>
        <hr>
      </div>
      <div class="change-button1" @click="changeInfo()">确定修改</div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
  name: 'DetailHeader',
  data () {
    return {
      showAbs: true,
      opacityStyle: {
        opacity: 0
      },
      showBlock: true,
      list: {
        school: '',
        stuentId: '',
        studentName: '',
        studentSex: '',
        studentPhone: '',
        studentWx: ''
      },
      changeList: {
        school: '',
        studentName: '',
        studentSex: '',
        studentPhone: '',
        studentWx: ''
      },
      sex: ''
    }
  },
  methods: {
    goBack () {
      if (!this.showBlock) {
        this.showBlock = !this.showBlock
      } else {
        this.$router.go(-1)
      }
    },
    getUserInfo () {
      axios.post('http://equator8848.xyz:8080/yian2/student/getPersonalInfor.do')
        .then((res) => {
          console.log('用户信息', res.data.data)
          this.list = res.data.data
        })
    },
    handleScroll () {
      const top = document.documentElement.scrollTop
      if (top > 60) {
        let opacity = top / 140
        opacity = opacity > 1 ? 1 : opacity
        this.opacityStyle = {
          opacity: opacity
        }
        this.showAbs = false
      } else {
        this.showAbs = true
      }
    },
    changeInfo () {
      if (this.changeList.studentName === '') {
        this.changeList.studentName = this.list.studentName
      }
      if (this.changeList.studentSex === '') {
        this.changeList.studentSex = this.list.studentSex
      }
      if (this.changeList.studentPhone === '') {
        this.changeList.studentPhone = this.list.studentPhone
      }
      if (this.changeList.studentContactWay === '') {
        this.changeList.studentContactWay = this.list.studentContactWay
      }
      if (this.changeList.studentSex === '男') {
        this.sex = '1'
      } else if (this.changeList.studentSex === '女') {
        this.sex = '0'
      } else {
        console.log('性别转换错误')
      }
      console.log(this.changeList)
      axios.post('http://equator8848.xyz:8080/yian2/student/updateStudentInfor.do', qs.stringify({
        school: '10617',
        studentName: this.changeList.studentName,
        studentSex: this.sex,
        studentPhone: this.changeList.studentPhone,
        studentContactWay: this.changeList.studentWx
      }))
        .then((res) => {
          this.$layer.msg(res.data.msg)
        })
    },
    upload () {
      let _this = this
      console.log('confirm upload')
      let file = this.$refs.file.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      let formData = new FormData()
      formData.append('photo', file)
      reader.onload = function (e) {
        axios.post('http://yian.our16.top:8080/yian/account/uploadPhoto.do', formData, {
          headers: {'Content-Type': 'multipart/form-data'}
        })
          .then(res => {
            console.log(res)
            if (res.data.status === 1) {
              _this.$layer.closeAll()
              _this.$layer.msg('上传成功')
            } else {
              _this.$layer.closeAll()
              _this.$layer.msg('似乎出现了问题')
            }
          })
      }
    }
  },
  mounted () {
    this.getUserInfo()
  },
  activated () {
    console.log(111)
    window.addEventListener('scroll', this.handleScroll)
  },
  deactivated () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl';
  .header-abs
    text-align: center
    position: absolute
    left: .2rem
    top: .2rem
    width: .8rem
    height: .8rem
    line-height: .8rem
    border-radius: .4rem
    background: rgba(0, 0, 0, .3)
    .header-abs-back
      color: #ffffff
      font-size: .4rem
  .banner
    background-color #A6DCFD
  .banner img
    width 100%
  .show-block
    background-color #fff
    .title
      margin-top .4rem
      margin-bottom .2rem
      padding .1rem .2rem
      border-bottom 1px solid #D7D7D7
      text-align center
    .content-wrapper
      display flex
      justify-content space-between
      padding .1rem .8rem
      .item-title
        font-size .3rem
        margin-top .2rem
      .item-detail
        font-size .3rem
        margin-top .2rem
  .photo-button
    position relative
    text-align center
    margin 0 1.5rem
    margin-top .7rem
    height .6rem
    line-height .6rem
    background-color #F9F9F9
    color #007CF9
    border-radius .14rem
    border 1px solid #E4E4E4
    .upload-text
      position absolute
      top 0
      left 0
      right 0
  .change-button
    text-align center
    margin 0 1.5rem
    margin-top .3rem
    height .6rem
    line-height .6rem
    background-color $bgColor
    color #ffffff
    border-radius .14rem
  .show-block1
    background-color #fff
    .title1
      margin-top .3rem
      margin-bottom .2rem
      padding .1rem .2rem
      border-bottom 1px solid #D7D7D7
      text-align center
    .content-wrapper1
      display flex
      justify-content space-between
      padding .1rem .8rem
      .item-title1
        font-size .3rem
        margin-top .2rem
      .item-detail1
        font-size .3rem
        margin-top .2rem
        border-bottom 1px solid #cccccc
  .change-button1
    text-align center
    margin 0 1.5rem
    margin-top 1.6rem
    height .6rem
    line-height .6rem
    background-color #FF5B5B
    color #ffffff
    border-radius .14rem
</style>
