<template>
  <div>
    <evaluation-header :title="title"></evaluation-header>
    <div class="user-info border-bottom">用户名</div>
    <div class="evaluation-num">
      <div class="flex-item">好评 99</div>
      <div class="flex-item">中评 99</div>
      <div class="flex-item">差评 99</div>
    </div>
    <div class="tab">
      <div class="tab-item" :class="[isSelected ? activeItem: blankItem]" @click="tabLeftClick">Ta收到的</div>
      <div class="tab-item" :class="[!isSelected ? activeItem: blankItem]" @click="tabRightClick">Ta发出的</div>
    </div>
    <div class="evaluation-wrapper">
      <evaluation-panel :evaluationList="activeList"></evaluation-panel>
    </div>
  </div>
</template>

<script>
import EvaluationHeader from 'components/header/header'
import EvaluationPanel from 'components/evaluation-panel/evaluation-panel'
import qs from 'qs'
export default {
  name: 'Evaluation',
  components: {
    EvaluationHeader,
    EvaluationPanel
  },
  data () {
    return {
      title: 'Ta的评价',
      isSelected: true,
      activeItem: 'active-item',
      blankItem: 'blank-item',
      inList: [],
      outList: [],
      activeList: []
    }
  },
  methods: {
    tabLeftClick () {
      this.isSelected = true
      this.activeList = this.inList
    },
    tabRightClick () {
      this.isSelected = false
      this.activeList = this.outList
    },
    getOwnInEvaluation () {
      let _this = this
      this.axios.get('http://equator8848.xyz:8080/yian2/evaluate/getOwnInEvaluation.do', qs.stringify({
        pageNum: '',
        pageSize: ''
      }))
        .then((res) => {
          // console.log(res)
          _this.inList = _this.normalizeList(res.data.data.list)
          _this.activeList = _this.inList
        })
    },
    getOwnOutEvaluation () {
      let _this = this
      this.axios.get('http://equator8848.xyz:8080/yian2/evaluate/getOwnOutEvaluation.do', qs.stringify({
        pageNum: '',
        pageSize: ''
      }))
        .then((res) => {
          // console.log(res)
          _this.outList = _this.normalizeList(res.data.data.list)
          // console.log(_this.outList)
        })
    },
    normalizeList (rawList) {
      let ret = []
      for (let item in rawList) {
        let obj = {}
        obj.content = rawList[item].content
        obj.evaluationTime = rawList[item].evaluationTime
        obj.id = rawList[item].id
        if (rawList[item].evaluationLevel === 0) {
          obj.evaluationLevel = '好评'
        } else if (rawList[item].evaluationLevel === 1) {
          obj.evaluationLevel = '中评'
        } else if (rawList[item].evaluationLevel === 2) {
          obj.evaluationLevel = '差评'
        }
        ret.push(obj)
      }
      return ret
    },
    getEvaluationNumber () {
      this.axios.get('http://www.equator8848.xyz:8080/yian2/evaluate/getOwnEvaluationData.do')
        .then((res) => {
          console.log(res)
        })
    }
  },
  mounted () {
    this.getEvaluationNumber()
    this.getOwnInEvaluation()
    this.getOwnOutEvaluation()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
  .user-info
    height 1rem
    line-height 1rem
    margin 1rem .12rem 0
    padding 0 .6rem
    background-color #ffffff
  .evaluation-num
    display flex
    justify-content space-around
    height 1rem
    line-height 1rem
    margin 0 .12rem
    background-color #fff
  .tab
    display flex
    background-color #fff
    margin 0 .12rem
    .tab-item
      height 0.8rem
      line-height .8rem
      width 50%
      text-align center
    .active-item
      background-color $color-theme
      color #ffffff
      box-sizing border-box
    .blank-item
      background-color #ffffff
      color $color-theme
      box-sizing border-box
      border 0.02rem solid $color-theme-light
</style>
