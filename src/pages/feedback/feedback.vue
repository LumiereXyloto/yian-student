<template>
  <div class="wrapper">
    <feedback-header :title="title" :bgColor="bgColor" :fontColor="fontColor"></feedback-header>
    <div class="flex-wrapper">
      <img class="yian" src="@/assets/images/yian.png">
      <div class="link">
        <p style="letter-spacing: 0.01rem;padding: .06rem">
          <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=04894bd2d799339abfce331bfae0466dbf15e638367f71531db5065c2557ba4a">
            加入QQ群
          </a>
        </p>
        <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=04894bd2d799339abfce331bfae0466dbf15e638367f71531db5065c2557ba4a"></a>
        <p style="letter-spacing: 0.07rem;padding: .06rem">联系我们</p>
      </div>
    </div>
    <div class="content">
      <textarea class="text" placeholder="快来反馈意见吧....." v-model="content"></textarea>
    </div>
    <div class="submit" @click="submit">提 交</div>
  </div>
</template>

<script>
import qs from 'qs'
import FeedbackHeader from 'components/header/header'
export default {
  name: 'Feedback',
  components: {
    FeedbackHeader
  },
  data () {
    return {
      title: '用户反馈',
      bgColor: '#409Eff',
      fontColor: '#ffffff',
      content: ''
    }
  },
  methods: {
    submit () {
      if (this.content) {
        this.axios.post('http://equator8848.xyz:8080/yian2/feedback/addFeedback.do', qs.stringify({
          content: this.content
        }))
          .then((res) => {
            this.$layer.closeAll()
            this.$layer.msg(res.data.msg)
          })
      } else {
        this.$layer.closeAll()
        this.$layer.msg('请先输入反馈信息！')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
  .wrapper
    margin 1.2rem .12rem 0
    .flex-wrapper
      display flex
      justify-content space-between
      padding 0 .8rem
      height 2rem
      background-color #ffffff
      border-radius .26rem
      .yian
        height .8rem
        width 2.4rem
        margin-top .6rem
      .link
        font-size .32rem
        color #8D8D8D
        margin-top .64rem
    .content
      margin-top .34rem
      background-color #ffffff
      padding .3rem
      border-radius .26rem
      .text
        background-color #ffffff
        outline: none
        resize: none
        width 100%
        height 6rem
    .submit
      margin .4rem auto 0
      color #ffffff
      background-color $color-theme
      font-size .32rem
      width 2rem
      padding .2rem 0
      text-align center
      border-radius .2rem
</style>
