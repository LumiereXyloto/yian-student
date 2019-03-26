<template>
  <div class="wrapper">
    <!-- <div class="content-wrapper">
      <div v-for="item in iconList" :key="item.id" class="iconWrapper">
        <img :src="item.icon" class="iconImage">
      </div>
    </div> -->
    <swiper :options="swiperOption" class="swiperContainer">
      <swiper-slide v-for="(page,index) of pages" :key="index" class="content-wrapper">
        <div class="iconWrapper" v-for="item of page" :key="item.id" @click="selectItem(item)">
          <img class="iconImage" :src="item.imgUrl">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'AvatarPanel',
  data () {
    return {
      swiperOption: {
        autoplay: false
      },
      iconList: []
    }
  },
  computed: {
    pages () {
      const pages = []
      this.iconList.forEach((item, index) => {
        const page = Math.floor(index / 12)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      // console.log(pages)
      return pages
    }
  },
  methods: {
    getIconList () {
      this.axios.get('http://equator8848.xyz:8080/yian2/common/account/getIconList.do')
        .then((res) => {
          if (res.data.status === 1) {
            this.iconList = this.normalizeList(res.data.data.list)
          }
        })
    },
    normalizeList (list) {
      let ret = []
      for (let i in list) {
        let obj = {}
        obj.id = list[i].id
        obj.imgUrl = list[i].icon
        ret.push(obj)
      }
      // console.log(ret)
      return ret
    },
    selectItem (item) {
      let _this = this
      this.axios.post('http://equator8848.xyz:8080/yian2/student/updateIcon.do', qs.stringify({
        icon: parseInt(item.id)
      }))
        .then((res) => {
          // console.log(res)
          if (res.status === 200) {
            _this.$layer.closeAll()
            _this.$layer.msg(res.data.msg)
            _this.$emit('chooseIcon', true, res.data.data)
          }
        })
    },
    bindClick () {
      let _this = this
      document.addEventListener('click', (e) => {
        if (e.target.className === 'wrapper') {
          _this.$emit('closePanel', true)
        }
      })
    }
  },
  mounted () {
    this.getIconList()
    this.bindClick()
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
    // background-color rgba(0,0,0,0.5)
    display flex
    justify-content center
    align-items center
  .swiperContainer
    width 85%
    height 50%
    z-index 999
    border-radius .2rem
    .content-wrapper
      // width 85%
      // height 50%
      // z-index 999
      background-color #fff
      padding-top .4rem
      // border-radius .2rem
      display flex
      flex-wrap wrap
      align-content flex-start
      .iconWrapper
        width 25%
        height 1.5rem
        // box-sizing border-box
        // border 1px solid grey
        text-align center
        margin-top .3rem
        .iconImage
          width 1.2rem
          height 1.2rem
</style>
