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
          <span class="black">{{list.normalizedJobType}}</span>
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
          <span class="black" @click="toMerchantDetail">点击查看</span>
        </div>
      </div>

      <div class="button" @click="toggleSign">{{buttonText}}</div>
      <div style="height:0.86rem"></div>
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
        normalizedJobType: '',
        hireNum: '',
        nowNum: '',
        details: '',
        merchantName: '',
        merchantPhone: '',
        merchantId: '',
        isSignOrNot: ''
      },
      buttonText: ''
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
      this.getButtonText()
      this.list.normalizedJobType = this.normalizeJobType(res.data.data.jobType)
      // console.log(this.list)
    },
    toMerchantDetail () {
      this.$router.push(`/merchant-evaluation/${this.list.merchantId}`)
    },
    toggleSign () {
      let _this = this
      if (this.list.isSignOrNot === '0') {
        this.$layer.closeAll()
        this.$layer.open({
          btn: ['确认', '取消'],
          content: '确认报名？',
          className: 'good luck1',
          shade: true,
          yes (index, $layer) {
            _this.axios.post('http://equator8848.xyz:8080/yian2/parttimeHall/applyParttime.do', qs.stringify({
              jobId: _this.list.jobId,
              merchantId: _this.list.merchantId
            }))
              .then(res => {
                if (res.status === 200) {
                  // 未报名的人报名后返回的消息。被商家拒绝报名res.data.status === 0
                  _this.$layer.closeAll()
                  _this.$layer.msg(res.data.msg)
                  if (res.data.status === 1) {
                    _this.list.isSignOrNot = '1'
                    // 报名成功
                    _this.buttonText = '取消报名'
                    _this.list.nowNum += 1
                  }
                }
                // if (res.data.status === 1) {
                //   _this.$layer.closeAll()
                //   _this.$layer.msg(res.data.msg)
                //   _this.list = []
                // }
              })
          }
        })
      } else {
        this.$layer.closeAll()
        this.$layer.open({
          btn: ['确认', '取消'],
          content: '确认取消？',
          className: 'good luck1',
          shade: true,
          yes (index, $layer) {
            _this.axios.post('http://equator8848.xyz:8080/yian2/parttimeHall/cancelParttime.do', qs.stringify({
              jobId: _this.list.jobId
            }))
              .then(res => {
                // console.log(res)
                if (res.status === 200) {
                  // 未报名的人报名后返回的消息。被商家拒绝报名res.data.status === 0
                  _this.$layer.closeAll()
                  _this.$layer.msg(res.data.msg)
                  if (res.data.status === 1) {
                    // 取消成功
                    _this.buttonText = '立即报名'
                    _this.list.isSignOrNot = '0'
                    _this.list.nowNum -= 1
                  }
                }
              })
          }
        })
      }
    },
    getButtonText () {
      if (this.list.isSignOrNot === '0') {
        this.buttonText = '立即报名'
      } else {
        this.buttonText = '取消报名'
      }
    },
    normalizeJobType (jobType) {
      switch (jobType) {
        case 1:
          return '家教'
        case 2:
          return '服务员'
        case 3:
          return '接待员'
        case 4:
          return '安保人员'
        case 5:
          return '推广促销'
        case 6:
          return '翻译'
        case 7:
          return '话务员'
        case 8:
          return '实习生'
        case 9:
          return '收银员'
      }
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
    left 0
    bottom 0
    width 100%
    text-align center
    background-color $color-theme
    color #ffffff
    padding .2rem 0
</style>
