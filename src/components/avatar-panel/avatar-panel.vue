<template>
  <div class="wrapper">
    <div class="content-wrapper">
      <div v-for="item in iconList" :key="item.id" class="iconWrapper">
        <img :src="item.icon" class="iconImage">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvatarPanel',
  data () {
    return {
      iconList: []
    }
  },
  methods: {
    getIconList () {
      this.axios.get('http://equator8848.xyz:8080/yian2/common/account/getIconList.do')
        .then((res) => {
          if (res.data.status === 1) {
            this.iconList = res.data.data.list
            console.log(this.iconList)
          }
        })
    }
  },
  mounted () {
    this.getIconList()
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
    display flex
    justify-content center
    align-items center
    .content-wrapper
      width 85%
      height 50%
      z-index 999
      background-color #fff
      border-radius .2rem
      display flex
      flex-wrap wrap
      .iconWrapper
        width 33.3%
        box-sizing border-box
        border 1px solid grey
        .iconImage
          width 80%
</style>
