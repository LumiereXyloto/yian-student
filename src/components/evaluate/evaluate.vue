<template>
  <div id="wrapper">
    <div class="content-wrapper">
      <div class="content-header border-bottom">
        评 价
        <div class="x" @click="close">x</div>
      </div>
        <div class="star-wrapper">
          <div class="starXin" v-for="(item,index) in list" :key='index'>
            <div @click="star(index)">
              <img :src="starNum>index?stara:starb"/>
            </div>
          </div>
        </div>
      <p class="starText">{{starText}}</p>
      <div class="evaluation-select">
        <div class="select-item" @click="handleItemClick" ref="item1">{{contentList[0].text}}</div>
        <div class="select-item" @click="handleItemClick" ref="item2">{{contentList[1].text}}</div>
      </div>
      <div class="evaluation-select">
        <div class="select-item" @click="handleItemClick" ref="item3">{{contentList[2].text}}</div>
        <div class="select-item" @click="handleItemClick" ref="item4">{{contentList[3].text}}</div>
      </div>
      <div class="evaluation-input">
        <input type="text" placeholder="其他想说的（将匿名告诉商家）" v-model="evaluationInput">
      </div>
      <div class="submit-button" @click="submit">匿名提交</div>
    </div>
  </div>
</template>

<script>
import yellowStar from '../../../static/images/yellowStar.png'
import blankStar from '../../../static/images/blankStar.png'
import qs from 'qs'
export default {
  name: 'Evaluate',
  data () {
    return {
      contentList: [{text: '态度友善', id: 1}, {text: '不拖欠工资', id: 2}, {text: '按时下班', id: 3}, {text: '兼职愉快', id: 4}],
      evaluationInput: '',
      evaluationContent: '',
      selectItem: [],
      list: [0, 1, 2],
      stara: yellowStar, // 亮星星
      starb: blankStar, // 暗星星
      starNum: 0,
      starText: ''
    }
  },
  props: {
    jobId: String,
    toUserId: String
  },
  methods: {
    handleItemClick (e) {
      if (e.target.className === 'select-item') {
        e.target.className = 'selected-item'
        this.selectItem = []
      } else {
        e.target.className = 'select-item'
        this.selectItem = []
      }
    },
    checkContent () {
      if (this.$refs.item1.attributes.class.nodeValue === 'selected-item') {
        this.selectItem.push(this.$refs.item1.innerHTML)
      }
      if (this.$refs.item2.attributes.class.nodeValue === 'selected-item') {
        this.selectItem.push(this.$refs.item2.innerHTML)
      }
      if (this.$refs.item3.attributes.class.nodeValue === 'selected-item') {
        this.selectItem.push(this.$refs.item3.innerHTML)
      }
      if (this.$refs.item4.attributes.class.nodeValue === 'selected-item') {
        this.selectItem.push(this.$refs.item4.innerHTML)
      }

      if (this.selectItem.length === 0) {
        if (!this.evaluationInput) {
          this.$layer.closeAll()
          this.$layer.msg('请先进行评价！')
        } else {
          this.evaluationContent = this.evaluationInput
        }
      } else {
        if (!this.evaluationInput) {
          this.evaluationContent = this.selectItem.join('，')
        } else {
          this.evaluationContent = this.selectItem.join('，') + '，' + this.evaluationInput
        }
      }
      this.selectItem = []
    },
    checkStarNum () {
      if (this.starNum === 0) {
        this.$layer.closeAll()
        this.$layer.msg('请先为商家评星！')
        return false
      } else {
        return true
      }
    },
    evaluate () {
      let _this = this
      // console.log(this.evaluationContent, this.starNum)
      // console.log(this.jobId, this.toUserId)
      // console.log(this.evaluationContent, this.starNum)
      this.axios.post('http://equator8848.xyz:8080/yian2/evaluate/evaluate.do', qs.stringify({
        jobId: this.jobId,
        toUserId: this.toUserId,
        content: this.evaluationContent,
        level: this.starNum
      }))
        .then((res) => {
          if (res.data.status === 1) {
            _this.$layer.closeAll()
            _this.$layer.msg(res.data.msg)
            _this.$emit('handleItemDelete', _this.jobId)
            _this.$emit('changeEvaluateShow')
          } else if (res.data.status === -1) {
            _this.$layer.closeAll()
            _this.$layer.msg(res.data.msg)
            _this.$emit('changeEvaluateShow')
          }
        })
    },
    submit () {
      this.checkContent()
      if (this.evaluationContent && this.checkStarNum()) {
        this.evaluate()
      }
    },
    close () {
      this.$emit('changeEvaluateShow')
    },
    bindClose () {
      document.addEventListener('click', this.closeHandler)
    },
    closeHandler (e) {
      if (e.target.id === 'wrapper') {
        this.$emit('changeEvaluateShow')
        this.clearContent()
      }
    },
    star (val) {
      this.starNum = val + 1
    },
    clearContent () {
      this.$refs.item1.attributes.class.nodeValue = 'select-item'
      this.$refs.item1.attributes.class.nodeValue = 'select-item'
      this.$refs.item1.attributes.class.nodeValue = 'select-item'
      this.$refs.item1.attributes.class.nodeValue = 'select-item'
      this.starNum = 0
      this.evaluationContent = ''
    }
  },
  mounted () {
    this.bindClose()
  },
  watch: {
    starNum () {
      if (this.starNum === 0) {
        this.starText = ''
      } else if (this.starNum === 1) {
        this.starText = '对商家不是很满意'
      } else if (this.starNum === 2) {
        this.starText = '还不错噢'
      } else if (this.starNum === 3) {
        this.starText = '非常满意，无可挑剔'
      }
    }
  },
  beforeDestroy () {
    document.removeEventListener('click', this.closeHandler)
  }
}
</script>

<style lang="stylus" scoped>
  #wrapper
    position fixed
    top -0.3rem
    width 100%
    height 100%
    z-index 10
    // background-color rgba(0,0,0,0.5)
    .star-wrapper
      display flex
      justify-content center
      margin-top .3rem
      margin-bottom .2rem
      img
        width .5rem
        margin 0 .2rem
    .starText
      margin-bottom .2rem
      height .3rem
      line-height .3rem
      text-align center
      font-size .24rem
      color #FCA31D
    .content-wrapper
      position fixed
      bottom 0
      width 100%
      height 50%
      z-index 999
      background-color #fff
      .content-header
        position relative
        height 1rem
        line-height 1rem
        text-align center
        font-size .36rem
        .x
          position absolute
          font-size .44rem
          top 0
          left .2rem
      .evaluation-select
        display flex
        margin 0 1.1rem .3rem
        justify-content space-between
        .select-item
          text-align center
          height .6rem
          line-height .6rem
          border 1px solid #cccccc
          width 46%
          border-radius .06rem
        .selected-item
          text-align center
          height .6rem
          line-height .6rem
          border 1px solid #cccccc
          width 46%
          border-radius .06rem
          background-color #D7D7D7
      .evaluation-input
        margin 0 .6rem
        input
          display block
          width 80%
          margin 0 auto
          background-color #F6F6F6
          padding .1rem .12rem
          border 1px solid #cccccc
          border-radius .06rem
      .submit-button
        position fixed
        bottom 0
        width 100%
        height .86rem
        line-height .86rem
        text-align center
        font-size .36rem
        background-color #474B5B
        color #ffffff
</style>
