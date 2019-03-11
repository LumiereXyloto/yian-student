<template>
  <div>
    <div class="item">
      <div class="border-container">
        <div class="item-title">{{list.brief}}</div>
        <div class="item-location border-bottom">{{list.location}}</div>
        <div class="row-wrapper">
          <span class="grey">基本工资：</span>
          <span class="black">{{list.reward}}元/{{list.rewardType}}</span>
        </div>
      </div>
      <div class="border-container">
        <div class="row-wrapper">
          <span class="grey">兼职类型：</span>
          <span class="black">{{list.jobType}}</span>
        </div>
        <div class="row-wrapper">
          <span class="grey">招聘人数：</span>
          <span class="black">{{list.hireNum}}</span>
        </div>
        <div class="row-wrapper">
          <span class="grey">已聘人数：</span>
          <span class="black">{{list.nowNum}}</span>
        </div>
      </div>
      <div class="border-container">
        <div class="detail-title-container">
          <div class="detail-title">工作内容：</div>
        </div>
        <div class="detail">{{list.details}}</div>
        <div class="tip">若发现实际工作内容与上述描述不符，请您提高警惕并第一时间向我们举报</div>
      </div>
      <div class="border-container">
        <div class="contact-container">
          <div class="contact">联系信息：</div>
        </div>
        <div class="row-wrapper">
          <span class="grey">联系人：</span>
          <span class="black">{{list.merchantName}}</span>
        </div>
        <div class="row-wrapper">
          <span class="grey">联系方式：</span>
          <span class="black">{{list.merchantPhone}}</span>
        </div>
        <div class="row-wrapper">
          <span class="grey">他的评价：</span>
          <span class="black"  @click="toMerchantDetail">点击查看</span>
        </div>
      </div>

      <div class="button">{{buttonText}}</div>
      <!-- <div class="warn border-bottom">(提示：凡收取费用的兼职，需谨慎 ! )</div> -->
    </div>
  </div>
</template>

<script>
import bus from '@/assets/eventBus.js'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'DetailList',
  data () {
    return {
      list: {
        brief: '',
        location: '',
        reward: '',
        rewardType: '',
        jobType: '',
        hireNum: '',
        nowNum: '',
        details: '',
        merchantName: '',
        merchantPhone: '',
        merchantId: '',
        isSignOrNot: ''
      },
      buttonText: '立即报名'
    }
  },
  methods: {
    sendRequest () {
      axios.post('http://equator8848.xyz:8080/yian2/parttimeHall/getParttimeDetail.do', qs.stringify({
        jobId: this.$route.params.id
      }), {
        withCredentials: true
      })
        .then(this.sendRequestSucc)
        // .then(() => {
        //   bus.$emit('emitParams', this.list.merchantId, this.list.jobId, this.list.isSignOrNot)
        // })
    },
    sendRequestSucc (res) {
      this.list = res.data.data
    },
    toMerchantDetail () {
      this.$router.push(`/evaluation/${this.list.merchantId}`)
    }
  },
  mounted () {
    this.sendRequest()
  },
  created () {
    bus.$on('addNum', (n) => {
      this.list.nowNum += n
    })
    bus.$on('delNum', (n) => {
      this.list.nowNum -= n
    })
  },
  beforeDestroy () {
    bus.$off()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
  .border-container
    margin-bottom .3rem
    border-radius .2rem
    overflow hidden
  .item
    margin 1.1rem .12rem 0
  .item-title
    font-size .38rem
    padding .4rem .4rem
    background-color #fff
  .item-location
    font-size .24rem
    color grey
    padding-left .4rem
    padding-bottom .1rem
    background-color #fff
  .row-wrapper
    padding .2rem .4rem
    background-color #fff
    .grey
      font-size .28rem
      color #979797
    .black
      font-size .32rem
  .contact-container
    background-color #fff
    padding .2rem 0
    .contact
      margin 0 .4rem
      border-left .1rem solid $bgColor
      padding-left .2rem
      font-size .32rem
      color #0F87FF
      background-color #fff
  .detail-title-container
    background-color #fff
    padding .2rem 0
    .detail-title
      margin .0 .4rem
      border-left .1rem solid $bgColor
      padding-left .2rem
      font-size .32rem
      color #0F87FF
      background-color #fff
  .detail
    padding .1rem .4rem
    font-size .28rem
    line-height .5rem
    background-color #fff
  .tip
    padding 0 .4rem .3rem .4rem
    font-size .24rem
    font-weight bold
    background-color #fff
  // .warn
  //   padding .1rem .4rem .3rem .4rem
  //   color #FF4040
  //   margin-bottom 1rem
  //   font-size .26rem
  .button
    position fixed
    bottom .12rem
    width 80%
    margin 0 auto
    text-align center
    background-color $color-theme
    color #ffffff
    padding .2rem 0
</style>
