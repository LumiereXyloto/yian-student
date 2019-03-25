<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <!-- slides -->
      <swiper-slide v-for="item of swiperList" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import Swiper1 from '../../../static/images/swiper1.png'
import Swiper2 from '../../../static/images/swiper2.png'
import Swiper3 from '../../../static/images/swiper3.png'
export default {
  name: 'HomeSwiper',
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true,
        autoplay: 3000,
        speed: 1500,
        autoplayDisableOnInteraction: false
      },
      swiperList: [{
        id: '0001',
        imgUrl: Swiper1
      }, {
        id: '0002',
        imgUrl: Swiper2
      }, {
        id: '0003',
        imgUrl: Swiper3
      }]
    }
  },
  computed: {
    showSwiper () {
      return this.swiperList.length
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper >>> .swiper-pagination-bullet-active
    background: #ffffff
  .wrapper
    background: #eee
    .swiper-img
      width: 100%
</style>
