<template>
  <div class="wrapper" ref="wrapper">
    <div class="content-wrapper">
      <div class="content-header border-bottom">
        评 价
        <div class="x" @click="close">x</div>
      </div>
      <div class="star-wrapper">
      </div>
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
export default {
  name: 'Evaluate',
  data () {
    return {
      contentList: [{text: '态度友善', id: 1}, {text: '不拖欠工资', id: 2}, {text: '按时下班', id: 3}, {text: '兼职愉快', id: 4}],
      evaluationInput: '',
      evaluationContent: '',
      selectItem: []
    }
  },
  methods: {
    handleItemClick (e) {
      if (e.target.attributes.class.nodeValue === 'select-item') {
        e.target.attributes.class.nodeValue = 'selected-item'
      } else {
        e.target.attributes.class.nodeValue = 'select-item'
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
    submit () {
      this.checkContent()
      if (this.evaluationContent) {
        console.log(this.evaluationContent)
      }
    },
    close () {
      this.$refs.wrapper.style.display = 'none'
    },
    bindClose () {
      let _this = this
      document.addEventListener('click', function(e) {
        console.log(111)
        _this.this.$refs.wrapper.style.display = 'none'
      })
    },
    mounted () {
      this.bindClose()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    position fixed
    top 0
    width 100%
    height 100%
    z-index 10
    background-color rgba(0,0,0,0.5)
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
