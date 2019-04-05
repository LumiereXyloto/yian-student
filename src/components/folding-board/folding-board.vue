<template>
  <div class="wrapper">
    <div :class="isclicked? 'boardAfterClick':'boardBeforeClick'" @click="clicked">
      <span class="titleText">
        {{this.title}}({{content.length}})
      </span>
      <svg :class="isclicked?'iconAfterClick':'iconBeforeClick'" aria-hidden="true">
        <use xlink:href="#iconqianjin"></use>
      </svg>
    </div>
    <transition name="slide-fade">
      <div class="contentArea" v-show="isclicked" >
        <ul>
          <li
            class="item border-bottom"
            v-for="item of content"
            :key="item.jobId"
            @click="toDetail(item.jobId, item.merchantId)"
          >
            <div class="item-img-wrapper">
              <img src="@/assets/images/logo.png" class="item-img">
            </div>
            <div class="item-info">
              <p class="item-brief">{{item.title}}</p>
              <p class="item-time">{{item.jobDetail}}</p>
              <p class="item-time">{{item.signTime}}</p>
            </div>
          </li>
        </ul>
        <div class="tip" v-show="!this.content.length>0">{{msg}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'FlodingBoard',
  data () {
    return {
      isclicked: false
    }
  },
  props: {
    // 传入标题头
    title: {
      type: String,
      required: true
    },
    // 内部展示内容数组
    content: {
      type: Array
    },
    evaluateFlag: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String
    }
  },
  methods: {
    // 点击函数
    clicked () {
      this.isclicked = !this.isclicked
      // 触发点击事件
      this.$emit('beClicked')
    },
    // 点击兼职前往详情页
    toDetail (jobId, merchantId) {
      if (this.evaluateFlag) {
        this.$emit('toEvaluate', jobId, merchantId)
      } else {
        this.$router.push('/detail/' + jobId)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
@import '~@/assets/styles/varibles.styl'
  ul
    margin .2rem .12rem 0
    border-radius .2rem
    overflow hidden
  .tip
    text-align center
    margin 0 .12rem 0
    background-color #ffffff
    height .8rem
    line-height .8rem
    border-radius .1rem
  .wrapper
    margin .3rem .12rem 0
  .boardBeforeClick
    width 100%
    height 1.2rem
    line-height 1.2rem
    background #ffffff
    text-align center
    overflow hidden
    border-radius .1rem
    position relative
  .boardAfterClick
    width 100%
    height 1.2rem
    line-height 1.2rem
    background $color-theme
    text-align center
    overflow hidden
    border-radius .1rem
    color #ffffff
    position relative
  .item
    display flex
    background-color #ffffff
    .item-img-wrapper
      display flex
      justify-content center
      align-items center
      height 2rem
      .item-img
        width 1.2rem
        height 1.2rem
        padding .3rem
    .item-info
      padding: .1rem
      min-width: 0
      .item-time
        ellipsis()
        color #ADADAD
        padding .1rem 0
      .item-brief
        ellipsis()
        font-size .36rem
        padding .24rem 0 .1rem
  .slide-fade-enter-active
    transition: all .3s ease
  .slide-fade-leave-active
    transition: all .3s ease
  .slide-fade-enter
  .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
    transform: translateY(-10px)
    opacity: 0
  .iconBeforeClick
    position absolute
    left .4rem
    top .42rem
    width .36rem
    height .36rem
    fill currentColor
    overflow hidden
    color #acacac
    transition 0.4s
  .iconAfterClick
    position absolute
    left .4rem
    top .42rem
    width .36rem
    height .36rem
    fill currentColor
    overflow hidden
    color #ffffff
    transform rotate(90deg)
    transition 0.4s
</style>
