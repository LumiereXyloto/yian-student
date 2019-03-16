<template>
  <div>
    <!-- <scroll class="scroll-content" ref="scroll"> -->
      <div>
        <home-swiper></home-swiper>
        <home-jobtype></home-jobtype>
        <home-recommend></home-recommend>
      </div>
    <!-- </scroll> -->
  </div>
</template>

<script>
// import Scroll from 'components/scroll/scroll'
import HomeSwiper from 'components/swiper/swiper'
import HomeRecommend from 'components/recommend/recommend'
import HomeJobtype from 'components/home-jobtype/home-jobtype'
export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeRecommend,
    HomeJobtype
    // Scroll
  }
  // mounted () {
  //   setTimeout(() => {
  //     this.$refs.scroll.refresh()
  //     console.log(1)
  //   }, 2000)
  // }
}
</script>

<style lang="stylus" scoped>
  .scroll-content
    height 100%
    overflow hidden
</style>
