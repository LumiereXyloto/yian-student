<template>
  <div>
    <transition-group name="list">
      <div class="wrapper" v-for="item of evaluationList" :key="item.id">
        <div class="level">{{item.evaluationLevel}}</div>
        <div class="content">{{item.content}}</div>
        <div class="time">{{item.evaluationTime}}</div>
      </div>
    </transition-group>
    <div class="tip" v-show="tipText">{{tipText}}</div>
  </div>
</template>

<script>
export default {
  name: 'EvaluationPanel',
  props: {
    evaluationList: Array,
    tipText: String
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
  .wrapper
    margin .2rem .12rem 0
    background-color #ffffff
    border-radius .2rem
    color #3B3B3B
    .level
      height .7rem
      line-height .7rem
      padding-left .6rem
      font-weight bold
    .content
      color #5F5F5F
      margin-top .1rem
      padding 0 .6rem
    .time
      color #5F5F5F
      padding .3rem .6rem .2rem
      text-align right
  .tip
    text-align center
    margin .12rem .12rem 0
    background-color #ffffff
    height .8rem
    line-height .8rem
    border-radius .1rem
  .list-enter-active {
    transition: all 1s;
  }
  .list-enter {
    opacity: 0;
    transition: all 1s;
  }
</style>
