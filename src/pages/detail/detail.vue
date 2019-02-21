<template>
  <transition name="slide">
    <div>
      <detail-header :title="title"></detail-header>
      <detail-content></detail-content>
    </div>
  </transition>
</template>

<script>
import DetailHeader from 'components/header/header'
import DetailContent from 'components/detail-content/detail-content'
export default {
  name: 'Detail',
  components: {
    DetailHeader,
    DetailContent
  },
  data () {
    return {
      title: '兼职详情'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles'
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
