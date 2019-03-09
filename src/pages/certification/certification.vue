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
        <span>{{status}}</span>
      </div>
    </div>
    <div class="course">
      <div>如何认证？</div>
      <img class="course_iamge" src="@/assets/images/course_top.png">
      <div class="course_text">
        <p>请您上传手持学生证的照片</p>
        <p>露出脸部正面和学生证正面</p>
      </div>
    </div>
  </div>
</template>

<script>
import CertificationHeader from 'components/header/header'
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
      schoolName: '重庆邮电大学',
      status: '待审核'
    }
  }
}
</script>

<style lang="stylus" scoped>
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
      padding .4rem
      margin-top .4rem
      height 5rem
      border-radius .2rem
      background-color #ffffff
      .course_iamge
        display block
        margin .2rem auto 0
        width 2.5rem
        height 2.5rem
      .course_text
        margin-top .5rem

</style>
