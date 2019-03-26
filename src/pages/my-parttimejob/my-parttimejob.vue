<template>
  <div class="wrapper">
    <my-parttimejob-header :title="title" :bgColor="bgColor" :fontColor="fontColor"></my-parttimejob-header>
    <folding-board :title="tabTitle1" :content="content1" :msg="msg1"></folding-board>
    <folding-board :title="tabTitle2" :content="content2" :evaluateFlag="true" @toEvaluate="toEvaluate" :msg="msg2"></folding-board>
    <folding-board :title="tabTitle3" :content="content3" :msg="msg3"></folding-board>
    <transition name="slide">
      <evaluate-merchant v-show="evaluateShow" @changeEvaluateShow="changeEvaluateShow" :jobId="jobId" :toUserId="toUserId"></evaluate-merchant>
    </transition>
    <div id="grey-background" v-show="greyFlag"></div>
  </div>
</template>

<script>
import qs from 'qs'
import MyParttimejobHeader from 'components/header/header'
import FoldingBoard from 'components/folding-board/folding-board'
import EvaluateMerchant from 'components/evaluate/evaluate'
export default {
  name: 'MyParttimejob',
  components: {
    MyParttimejobHeader,
    FoldingBoard,
    EvaluateMerchant
  },
  data () {
    return {
      title: '我的兼职',
      bgColor: '#409Eff',
      fontColor: '#ffffff',
      tabTitle1: '已报名',
      tabTitle2: '待评价',
      tabTitle3: '已完成',
      content1: [],
      content2: [],
      content3: [],
      msg1: '',
      msg2: '',
      msg3: '',
      evaluateShow: false,
      jobId: '',
      toUserId: '',
      greyFlag: false
    }
  },
  methods: {
    getSignedJob () {
      this.axios.post('http://equator8848.xyz:8080/yian2/studentSignedJobInfo/getSignedJob.do', qs.stringify({
        status: 1
      }))
        .then((res) => {
          if (res.data.status === 1) {
            this.content1 = res.data.data
          } else if (res.data.status === 0) {
            this.msg1 = res.data.msg
          }
        })
    },
    toBeEvaluated () {
      this.axios.post('http://equator8848.xyz:8080/yian2/studentSignedJobInfo/getSignedJob.do', qs.stringify({
        status: 2
      }))
        .then((res) => {
          if (res.data.status === 1) {
            this.content2 = res.data.data
          } else if (res.data.status === 0) {
            this.msg2 = res.data.msg
          }
        })
    },
    getFinishedJob () {
      this.axios.post('http://equator8848.xyz:8080/yian2/studentSignedJobInfo/getSignedJob.do', qs.stringify({
        status: 4
      }))
        .then((res) => {
          if (res.data.status === 1) {
            this.content3 = res.data.data
          } else if (res.data.status === 0) {
            this.msg3 = res.data.msg
          }
        })
    },
    toEvaluate (jobId, merchantId) {
      this.greyFlag = true
      this.evaluateShow = true
      this.jobId = jobId
      this.toUserId = merchantId
    },
    changeEvaluateShow () {
      this.evaluateShow = false
      this.greyFlag = false
    }
  },
  mounted () {
    this.getSignedJob()
    this.toBeEvaluated()
    this.getFinishedJob()
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    margin-top 1.16rem
  .slide-enter-active {
    animation-name: slideInUp;
    animation-duration: 0.3s;
    animation-fill-mode: both;
  }
  .slide-leave-active {
    animation-name: slideOutDown;
    animation-duration: 0.3s;
    animation-fill-mode: both;
  }
  @keyframes slideInUp {
    from {
      transform: translate(0, 100%);
    }
    to {
      transform: translate(0, 2%);
    }
  }
  @keyframes slideOutDown {
    from {
      transform: translateZ(0);
    }

    to {
      visibility: hidden;
      transform: translate3d(0, 100%, 0);
    }
  }
  #grey-background
    position fixed
    top 0
    width 100%
    height 100%
    background-color rgba(0,0,0,0.5)
</style>
