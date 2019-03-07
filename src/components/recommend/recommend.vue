<template>
  <div>
    <div class="recommend-title" v-if="this.list.length>0">兼职推荐</div>
      <ul>
        <li
          class="item border-bottom"
          v-for="item of list"
          :key="item.jobId"
          @click="selectItem(item)"
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
        </li>
      </ul>
  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
  name: 'HomeRecommend',
  data () {
    return {
      list: []
    }
  },
  methods: {
    sendRequest () {
      axios.post('http://equator8848.xyz:8080/yian2/parttimeHall/allParttime.do', qs.stringify({
        pageNum: '1',
        onePageNum: '10'
      }))
        .then(this.sendRequestSucc)
    },
    sendRequestSucc (res) {
      // console.log(res)
      this.list = res.data.data.list
    },
    selectItem (item) {
      this.$router.push(`/detail/${item.jobId}`)
    }
  },
  mounted () {
    this.sendRequest()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/mixins.styl'
  @import '~@/assets/styles/varibles.styl'
  .recommend-title
    background: #eeeeee
    line-height: .8rem
    text-indent: .2rem
  .item
    display flex
    background-color #ffffff
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
</style>
