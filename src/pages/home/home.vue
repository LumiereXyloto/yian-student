<template>
  <div>
    <home-swiper></home-swiper>
    <home-jobtype></home-jobtype>
    <home-recommend></home-recommend>
  </div>
</template>

<script>
import HomeSwiper from 'components/swiper/swiper'
import HomeRecommend from 'components/recommend/recommend'
import HomeJobtype from 'components/home-jobtype/home-jobtype'
export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeRecommend,
    HomeJobtype
  }
}
</script>

<style lang="stylus" scoped>

</style>
