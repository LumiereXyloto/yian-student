<template>
  <div class="wrapper">
    <certification-header :title="title" :bgColor="bgColor" :fontColor="fontColor"></certification-header>
    <div class="info-bar">
      <div>
        <img class="school-image" src="@/assets/images/cqupt.png">
        <span>{{schoolName}}</span>
      </div>
      <div>
        <img class="status-image" src="@/assets/images/daishenhe.png">
        <span>{{statusText}}</span>
      </div>
    </div>
    <div class="course">
      <div class="hide" v-show="showFlag">
        <img :src="imageUrl" class="imgUrl">
      </div>
      <div @click="toggleHide" class="toggle" ref="toggle">如何认证？</div>
      <img class="course_iamge" src="@/assets/images/course_top.png">
      <div class="course_text">
        <p>请您上传手持学生证的照片</p>
        <p>露出脸部正面和学生证正面</p>
      </div>
    </div>
    <div class="upload-wrapper">
      <p class="up-image" @click="uploadPic">+</p>
      <input type="file" ref="file" name="file" @change="uploadToServer" accept="image/png,image/jpeg,image/jpg" class="uploadInput">
      <p>添加认证图片</p>
    </div>
    <div class="button" @click="confirmUpload">
      上传照片
    </div>
  </div>
</template>

<script>
import CertificationHeader from 'components/header/header'
import qs from 'qs'
export default {
  name: 'Certification',
  components: {
    CertificationHeader
  },
  data () {
    return {
      title: '信息认证',
      bgColor: '#409Eff',
      fontColor: '#ffffff',
      schoolName: '',
      statusText: '',
      imageUrl: '',
      addFlag: false,
      showFlag: false,
      isNewUser: true
    }
  },
  methods: {
    getCheckStatus () {
      this.axios.get('http://equator8848.xyz:8080/yian2/student/getCheckStatus.do')
        .then((res) => {
          // console.log(res)
          if (res.data.status === 1) {
            this.statusText = this.transformStatus(res.data.data.scheckStatus)
            this.schoolName = res.data.data.schoolName || '未知大学'
            if (res.data.data.auditImg) {
              this.imageUrl = res.data.data.auditImg
              this.showFlag = true
              this.isNewUser = false
            }
          }
        })
    },
    transformStatus (num) {
      if (num === 0) {
        return '新用户'
      } else if (num === 1) {
        return '待审核'
      } else if (num === 2) {
        return '未过审'
      } else if (num === 3) {
        return '已过审'
      } else if (num === 4) {
        return '已冻结'
      }
    },
    uploadPic () {
      // 触发文件上传的点击事件
      this.$refs.file.dispatchEvent(new MouseEvent('click'))
    },
    // 上传到服务器
    uploadToServer () {
      let _this = this
      let file = this.$refs.file.files[0]
      let formData = new FormData()
      formData.append('img', file)
      this.axios.post('http://equator8848.xyz:8080/yian2/student/auditImg.do', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
        .then(res => {
          if (res.data.status === 1) {
            _this.$layer.closeAll()
            _this.$layer.msg('添加成功，请点击上传')
            _this.imageUrl = res.data.data
            _this.showFlag = true
            _this.addFlag = true
          } else {
            _this.$layer.closeAll()
            _this.$layer.msg(res.data.msg)
          }
        })
    },
    confirmUpload () {
      let _this = this
      if (!this.addFlag) {
        this.$layer.closeAll()
        this.$layer.msg('请先添加认证图片')
      } else {
        this.axios.post('http://equator8848.xyz:8080/yian2/student/updateAuditImg.do', qs.stringify({
          img: this.imageUrl
        }))
          .then((res) => {
            if (res.data.status === 1) {
              _this.$layer.closeAll()
              _this.$layer.msg(res.data.msg)
            } else {
              _this.$layer.closeAll()
              _this.$layer.msg(res.data.msg)
            }
          })
      }
    },
    toggleHide () {
      if (!this.isNewUser) {
        this.showFlag = !this.showFlag
        if (this.showFlag) {
          this.$refs.toggle.innerHTML = '如何认证？'
        } else {
          this.$refs.toggle.innerHTML = '我的上传'
        }
      }
    }
  },
  mounted () {
    this.getCheckStatus()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
  .wrapper
    margin 1.26rem .12rem 0
    .info-bar
      display flex
      justify-content space-between
      padding 0 .5rem
      height 1.6rem
      line-height 1.6rem
      background-color #ffffff
      border-radius .2rem
      .school-image
        width .9rem
        height .9rem
      .status-image
        width .6rem
        height .6rem
    .course
      position relative
      padding .4rem
      margin-top .4rem
      height 4.4rem
      border-radius .2rem
      background-color #ffffff
      .hide
        position absolute
        left 50%
        height 4rem
        width 5rem
        margin-top .4rem
        margin-left -2.5rem
        background-color #ffffff
        text-align center
        .imgUrl
          height 100%
          width auto
      .toggle
        text-decoration underline
      .course_iamge
        display block
        margin .2rem auto 0
        width 2.5rem
        height 2.5rem
      .course_text
        margin-top .5rem
        text-align center
        font-size .32rem
    .upload-wrapper
      margin-top .4rem
      height 2rem
      background-color #ffffff
      text-align center
      color #BDBDBD
      border-radius .2rem
      .up-image
        font-size 1.4rem
        width 1.4rem
        margin 0 auto
      .uploadInput
        display none
    .button
      width 2rem
      margin .4rem auto 0
      height .6rem
      line-height .6rem
      background-color $color-theme
      color #ffffff
      letter-spacing .04rem
      text-align center
      border-radius .14rem
</style>
