<template>
  <div class="icons">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(page,index) of pages" :key="index">
        <div class="icon" v-for="item of page" :key="item.id" @click="selectItem(item)">
          <div class="icon-img">
            <img class="icon-img-content" :src="item.imgUrl">
          </div>
          <p class="icon-desc">{{item.desc}}</p>
        </div>
      </swiper-slide>
    </swiper>

    <!-- 根据兼职类型返回的列表 -->
      <div class="recommend-title" v-show="typeTitle">{{typeTitle}}（{{list.length}}）</div>
      <transition-group name="list" tag="ul">
        <router-link
          tag="li"
          class="item border-bottom"
          v-for="item of list"
          :key="item.jobId"
          :to="'/detail/' + item.jobId"
        >
          <div class="item-img-wrapper">
            <img src="@/assets/images/logo.png" class="item-img">
          </div>
          <div class="item-info">
            <p class="item-brief">{{item.jobSummary}}</p>
            <p class="item-time">{{item.address}}</p>
            <p class="item-time">{{item.jobTime}}</p>
            <div class="reward-and-num">
              <p class="item-reward">{{item.reward}}/{{item.rewardType}}</p>
              <p class="item-num">供需:{{item.nowNum}}/{{item.hireNum}}</p>
            </div>
          </div>
        </router-link>
        <div class="tip" key="tip" v-show="typeTitle && (!list.length)">该分类下暂无兼职</div>
      </transition-group>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'HomeIcons',
  data () {
    return {
      swiperOption: {
        autoplay: false
      },
      iconList: [],
      typeTitle: '',
      list: [],
      jobType: ''
    }
  },
  computed: {
    pages () {
      const pages = []
      this.iconList.forEach((item, index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },
  methods: {
    getAllType () {
      this.axios.post('http://equator8848.xyz:8080/yian2/jobTypeList/getParttimeType.do', qs.stringify({
        pageNum: '1',
        onePageNum: '10'
      }))
        .then((res) => {
          // console.log(res)
          this.normalizeList(res)
        })
    },
    normalizeList (res) {
      let ret = []
      let list = res.data.data.list
      for (let i in list) {
        let obj = {}
        obj.id = list[i].id
        obj.imgUrl = list[i].icon
        obj.desc = list[i].name
        ret.push(obj)
      }
      // console.log(ret)
      this.iconList = ret
    },
    sendRequest () {
      this.axios.post('http://equator8848.xyz:8080/yian2/parttimeHall/seekByJobType.do', qs.stringify({
        parttimeType: this.jobType,
        pageNum: '1',
        onePageNum: '10'
      }), {
        withCredentials: true
      })
        .then((res) => {
          this.sendRequestSucc(res)
        })
    },
    sendRequestSucc (res) {
      if (res.data.status === 1) {
        this.list = res.data.data.list
        if (this.list.length === 0) {
          this.tipText = '该分类下暂无兼职'
        }
      }
    },
    selectItem (item) {
      // console.log(item)
      this.typeTitle = item.desc
      this.jobType = item.id
      this.sendRequest()
    }
  },
  mounted () {
    this.getAllType()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles.styl'
  @import '~@/assets/styles/mixins.styl'
  ul
    background-color #fff
  .icons >>> .swiper-container
    width: 100%
    height: 0
    padding-bottom: 50%
    overflow: hidden
    background-color #ffffff
    .icon
      position: relative
      overflow: hidden
      float: left
      height: 0
      width: 25%
      padding-bottom: 25%
      .icon-img
        position: absolute
        width 100%
        top: 0.44rem
        left: 0
        right: 0
        bottom: .4rem
        box-sizing: border-box
        padding: .1rem
        .icon-img-content
          display: block
          margin: 0 auto
          height: 100%
      .icon-desc
        position: absolute
        right: 0
        left: 0
        bottom: .08rem
        height: .44rem
        line-height: .44rem
        color: $darkTextColor
        text-align: center
        ellipsis()
  // .fadeIn-enter-active, .fadeIn-leave-active {
  //   transition: opacity .5s;
  // }
  // .fadeIN-enter, .fadeIn-leave-to /* .fade-leave-active below version 2.1.8 */ {
  //   opacity: 0;
  // }
  .recommend-title
    background: #eeeeee
    line-height: .8rem
    text-indent: .2rem
  .item
    display flex
    .item-img-wrapper
      display flex
      justify-content center
      align-items center
      height 2.2rem
      .item-img
        width 1.2rem
        height 1.2rem
        padding .3rem
    .item-info
      flex: 1
      padding: .1rem
      min-width: 0
      .item-time
        ellipsis()
        color #ADADAD
        padding .1rem 0
      .item-brief
        ellipsis()
        font-size .36rem
        padding .1rem 0
      .reward-and-num
        display flex
        justify-content space-between
        padding-right .8rem
        .item-reward
          color #FE7418
          font-size .32rem
          padding .1rem 0
        .item-num
          color #ADADAD
          font-size .3rem
          padding .1rem 0
  .list-enter-active {
    transition: all 1s;
  }
  .list-enter {
    opacity: 0;
    transition: all 1s;
  }
  .tip
    text-align center
    margin 0 .12rem 0
    background-color #ffffff
    height .8rem
    line-height .8rem
    border-radius .1rem
</style>
