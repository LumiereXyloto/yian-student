<template>
  <div>
    <home-swiper></home-swiper>
    <home-recommend></home-recommend>
    <router-view></router-view>
  </div>
</template>

<script>
import HomeSwiper from 'components/swiper/swiper'
import HomeRecommend from 'components/recommend/recommend'
export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeRecommend
  }
}
</script>

<style lang="stylus" scoped>

</style>
