<template>
  <!-- <transition name="slide"> -->
    <div class="wrapper">
      <message-detail-header :title="title" :bgColor="bgColor" :fontColor="fontColor"></message-detail-header>
      <div class="title">{{msgTitle}}</div>
      <div class="border-wrapper">
        <div class="content">{{content}}</div>
        <div class="push-time">{{pushTime}}</div>
      </div>
    </div>
  <!-- </transition> -->
</template>

<script>
import qs from 'qs'
import MessageDetailHeader from 'components/header/header'
export default {
  name: 'MessageDetail',
  components: {
    MessageDetailHeader
  },
  data () {
    return {
      title: '消息详情',
      bgColor: '#409Eff',
      fontColor: '#ffffff',
      msgTitle: '',
      pushTime: '',
      content: ''
    }
  },
  methods: {
    getMessageDetail () {
      this.axios.post('http://equator8848.xyz:8080/yian2/message/getMessage.do', qs.stringify({
        messageId: this.$route.params.messageId
      }))
        .then((res) => {
          // console.log(res)
          this.getDetailsucc(res)
        })
    },
    getDetailsucc (res) {
      this.content = res.data.data.content
      this.msgTitle = res.data.data.msgTitle
      this.pushTime = res.data.data.pushTime
    }
  },
  mounted () {
    this.getMessageDetail()
  }
}
</script>

<style lang="stylus" scoped>
  // .slide-enter-active, .slide-leave-active
  //   transition: all 0.3s ease
  // .slide-enter, .slide-leave-to
  //   transform: translate3d(100%, 0, 0)
  .wrapper
    margin 1.1rem 0 0
    .title
      margin .3rem .2rem
      background #ffffff
      line-height .86rem
      text-align center
      border-radius .2rem
    .border-wrapper
      border-radius .2rem
      overflow hidden
      margin 0 .2rem
    .content
      font-size .28rem
      background-color #ffffff
      padding .6rem .4rem
      line-height .36rem
    .push-time
      font-size .28rem
      text-align right
      background-color #ffffff
      padding 0 .4rem .6rem
      line-height .36rem

</style>
