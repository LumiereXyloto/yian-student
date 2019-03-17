<template>
  <div>
    <preference-header :title="title" :bgColor="bgColor" :fontColor="fontColor"></preference-header>
    <div class="isPush">
      <span>接收推送通知</span>
      <preference-switch
        :value="value"
        :handle="true"
        @changeSwitch="changeSwitch"
        class="prefer-switch"
      ></preference-switch>
    </div>
    <div id="trigger2" ref="trigger2">
      {{triggerText}}
      <span>></span>
    </div>
    <div class="block-title">{{listTitle}}</div>
    <ul>
      <router-link
        tag="li"
        class="item border-bottom"
        v-for="item of preferList"
        :key="item.jobId"
        :to="'/detail/' + item.jobId"
      >
        <div class="item-img-wrapper">
          <img src="@/assets/images/logo.png" class="item-img">
        </div>
        <div class="item-info">
          <p class="item-brief">{{item.brief}}</p>
          <p class="item-time">{{item.location}}</p>
          <p class="item-time">{{item.time}}</p>
          <div class="reward-and-num">
            <p class="item-reward">{{item.reward}}/{{item.rewardType}}</p>
            <p class="item-num">供需:{{item.nowNum}}/{{item.hireNum}}</p>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import qs from 'qs'
import MobileSelect from 'mobile-select'
import axios from 'axios'
import PreferenceHeader from 'components/header/header'
import PreferenceSwitch from 'components/switch/switch'
axios.defaults.withCredentials = true
export default {
  name: 'DetailHeader',
  components: {
    PreferenceHeader,
    PreferenceSwitch
  },
  data () {
    return {
      title: '我的偏好',
      bgColor: '#409Eff',
      fontColor: '#ffffff',
      value: false, // switch默认状态
      triggerText: '',
      listTitle: '',
      chooseList: [{
        id: '1',
        value: '家教',
        childs: [{
          id: '0',
          value: '时薪',
          childs: [{
            id: '1',
            value: '8'
          }, {
            id: '2',
            value: '9'
          }, {
            id: '3',
            value: '10'
          }, {
            id: '4',
            value: '11'
          }, {
            id: '5',
            value: '12'
          }]
        }, {
          id: '1',
          value: '日薪',
          childs: [{
            id: '1',
            value: '50'
          }, {
            id: '2',
            value: '60'
          }, {
            id: '3',
            value: '70'
          }, {
            id: '4',
            value: '80'
          }, {
            id: '5',
            value: '90'
          }, {
            id: '5',
            value: '100'
          }]
        }, {
          id: '2',
          value: '月薪',
          childs: [{
            id: '1',
            value: '500'
          }, {
            id: '2',
            value: '1000'
          }, {
            id: '3',
            value: '1500'
          }, {
            id: '4',
            value: '2000'
          }, {
            id: '5',
            value: '2500'
          }, {
            id: '5',
            value: '3000'
          }]
        }]
      }, {
        id: '2',
        value: '服务员',
        childs: [{
          id: '0',
          value: '时薪',
          childs: [{
            id: '1',
            value: '8'
          }, {
            id: '2',
            value: '9'
          }, {
            id: '3',
            value: '10'
          }, {
            id: '4',
            value: '11'
          }, {
            id: '5',
            value: '12'
          }]
        }, {
          id: '1',
          value: '日薪',
          childs: [{
            id: '1',
            value: '50'
          }, {
            id: '2',
            value: '60'
          }, {
            id: '3',
            value: '70'
          }, {
            id: '4',
            value: '80'
          }, {
            id: '5',
            value: '90'
          }, {
            id: '5',
            value: '100'
          }]
        }, {
          id: '2',
          value: '月薪',
          childs: [{
            id: '1',
            value: '500'
          }, {
            id: '2',
            value: '1000'
          }, {
            id: '3',
            value: '1500'
          }, {
            id: '4',
            value: '2000'
          }, {
            id: '5',
            value: '2500'
          }, {
            id: '5',
            value: '3000'
          }]
        }]
      }, {
        id: '3',
        value: '接待员',
        childs: [{
          id: '0',
          value: '时薪',
          childs: [{
            id: '1',
            value: '8'
          }, {
            id: '2',
            value: '9'
          }, {
            id: '3',
            value: '10'
          }, {
            id: '4',
            value: '11'
          }, {
            id: '5',
            value: '12'
          }]
        }, {
          id: '1',
          value: '日薪',
          childs: [{
            id: '1',
            value: '50'
          }, {
            id: '2',
            value: '60'
          }, {
            id: '3',
            value: '70'
          }, {
            id: '4',
            value: '80'
          }, {
            id: '5',
            value: '90'
          }, {
            id: '5',
            value: '100'
          }]
        }, {
          id: '2',
          value: '月薪',
          childs: [{
            id: '1',
            value: '500'
          }, {
            id: '2',
            value: '1000'
          }, {
            id: '3',
            value: '1500'
          }, {
            id: '4',
            value: '2000'
          }, {
            id: '5',
            value: '2500'
          }, {
            id: '5',
            value: '3000'
          }]
        }]
      }, {
        id: '4',
        value: '安保人员',
        childs: [{
          id: '0',
          value: '时薪',
          childs: [{
            id: '1',
            value: '8'
          }, {
            id: '2',
            value: '9'
          }, {
            id: '3',
            value: '10'
          }, {
            id: '4',
            value: '11'
          }, {
            id: '5',
            value: '12'
          }]
        }, {
          id: '1',
          value: '日薪',
          childs: [{
            id: '1',
            value: '50'
          }, {
            id: '2',
            value: '60'
          }, {
            id: '3',
            value: '70'
          }, {
            id: '4',
            value: '80'
          }, {
            id: '5',
            value: '90'
          }, {
            id: '5',
            value: '100'
          }]
        }, {
          id: '2',
          value: '月薪',
          childs: [{
            id: '1',
            value: '500'
          }, {
            id: '2',
            value: '1000'
          }, {
            id: '3',
            value: '1500'
          }, {
            id: '4',
            value: '2000'
          }, {
            id: '5',
            value: '2500'
          }, {
            id: '5',
            value: '3000'
          }]
        }]
      }, {
        id: '5',
        value: '推广销售',
        childs: [{
          id: '0',
          value: '时薪',
          childs: [{
            id: '1',
            value: '8'
          }, {
            id: '2',
            value: '9'
          }, {
            id: '3',
            value: '10'
          }, {
            id: '4',
            value: '11'
          }, {
            id: '5',
            value: '12'
          }]
        }, {
          id: '1',
          value: '日薪',
          childs: [{
            id: '1',
            value: '50'
          }, {
            id: '2',
            value: '60'
          }, {
            id: '3',
            value: '70'
          }, {
            id: '4',
            value: '80'
          }, {
            id: '5',
            value: '90'
          }, {
            id: '5',
            value: '100'
          }]
        }, {
          id: '2',
          value: '月薪',
          childs: [{
            id: '1',
            value: '500'
          }, {
            id: '2',
            value: '1000'
          }, {
            id: '3',
            value: '1500'
          }, {
            id: '4',
            value: '2000'
          }, {
            id: '5',
            value: '2500'
          }, {
            id: '5',
            value: '3000'
          }]
        }]
      }, {
        id: '6',
        value: '翻译',
        childs: [{
          id: '0',
          value: '时薪',
          childs: [{
            id: '1',
            value: '8'
          }, {
            id: '2',
            value: '9'
          }, {
            id: '3',
            value: '10'
          }, {
            id: '4',
            value: '11'
          }, {
            id: '5',
            value: '12'
          }]
        }, {
          id: '1',
          value: '日薪',
          childs: [{
            id: '1',
            value: '50'
          }, {
            id: '2',
            value: '60'
          }, {
            id: '3',
            value: '70'
          }, {
            id: '4',
            value: '80'
          }, {
            id: '5',
            value: '90'
          }, {
            id: '5',
            value: '100'
          }]
        }, {
          id: '2',
          value: '月薪',
          childs: [{
            id: '1',
            value: '500'
          }, {
            id: '2',
            value: '1000'
          }, {
            id: '3',
            value: '1500'
          }, {
            id: '4',
            value: '2000'
          }, {
            id: '5',
            value: '2500'
          }, {
            id: '5',
            value: '3000'
          }]
        }]
      }, {
        id: '7',
        value: '话务员',
        childs: [{
          id: '0',
          value: '时薪',
          childs: [{
            id: '1',
            value: '8'
          }, {
            id: '2',
            value: '9'
          }, {
            id: '3',
            value: '10'
          }, {
            id: '4',
            value: '11'
          }, {
            id: '5',
            value: '12'
          }]
        }, {
          id: '1',
          value: '日薪',
          childs: [{
            id: '1',
            value: '50'
          }, {
            id: '2',
            value: '60'
          }, {
            id: '3',
            value: '70'
          }, {
            id: '4',
            value: '80'
          }, {
            id: '5',
            value: '90'
          }, {
            id: '5',
            value: '100'
          }]
        }, {
          id: '2',
          value: '月薪',
          childs: [{
            id: '1',
            value: '500'
          }, {
            id: '2',
            value: '1000'
          }, {
            id: '3',
            value: '1500'
          }, {
            id: '4',
            value: '2000'
          }, {
            id: '5',
            value: '2500'
          }, {
            id: '5',
            value: '3000'
          }]
        }]
      }, {
        id: '8',
        value: '实习生',
        childs: [{
          id: '0',
          value: '时薪',
          childs: [{
            id: '1',
            value: '8'
          }, {
            id: '2',
            value: '9'
          }, {
            id: '3',
            value: '10'
          }, {
            id: '4',
            value: '11'
          }, {
            id: '5',
            value: '12'
          }]
        }, {
          id: '1',
          value: '日薪',
          childs: [{
            id: '1',
            value: '50'
          }, {
            id: '2',
            value: '60'
          }, {
            id: '3',
            value: '70'
          }, {
            id: '4',
            value: '80'
          }, {
            id: '5',
            value: '90'
          }, {
            id: '5',
            value: '100'
          }]
        }, {
          id: '2',
          value: '月薪',
          childs: [{
            id: '1',
            value: '500'
          }, {
            id: '2',
            value: '1000'
          }, {
            id: '3',
            value: '1500'
          }, {
            id: '4',
            value: '2000'
          }, {
            id: '5',
            value: '2500'
          }, {
            id: '5',
            value: '3000'
          }]
        }]
      }, {
        id: '9',
        value: '收银员',
        childs: [{
          id: '0',
          value: '时薪',
          childs: [{
            id: '1',
            value: '8'
          }, {
            id: '2',
            value: '9'
          }, {
            id: '3',
            value: '10'
          }, {
            id: '4',
            value: '11'
          }, {
            id: '5',
            value: '12'
          }]
        }, {
          id: '1',
          value: '日薪',
          childs: [{
            id: '1',
            value: '50'
          }, {
            id: '2',
            value: '60'
          }, {
            id: '3',
            value: '70'
          }, {
            id: '4',
            value: '80'
          }, {
            id: '5',
            value: '90'
          }, {
            id: '5',
            value: '100'
          }]
        }, {
          id: '2',
          value: '月薪',
          childs: [{
            id: '1',
            value: '500'
          }, {
            id: '2',
            value: '1000'
          }, {
            id: '3',
            value: '1500'
          }, {
            id: '4',
            value: '2000'
          }, {
            id: '5',
            value: '2500'
          }, {
            id: '5',
            value: '3000'
          }]
        }]
      }],
      jobType: '',
      rewardType: '',
      reward: '',
      preferList: []
    }
  },
  methods: {
    normalizeJobType (jobType) {
      switch (jobType) {
        case 1:
          return '家教'
        case 2:
          return '服务员'
        case 3:
          return '接待员'
        case 4:
          return '安保人员'
        case 5:
          return '推广促销'
        case 6:
          return '翻译'
        case 7:
          return '话务员'
        case 8:
          return '实习生'
        case 9:
          return '收银员'
      }
    },
    normalizeRewardType (rewardType) {
      switch (rewardType) {
        case 0:
          return '小时'
        case 1:
          return '天'
        case 2:
          return '月'
      }
    },
    sendChangeRequest () {
      let _this = this
      axios.post('http://equator8848.xyz:8080/yian2/preference/changePreferenceJobType.do', qs.stringify({
        jobType: this.jobType,
        rewardType: this.rewardType,
        reward: this.reward
      }))
        .then((res) => {
          // console.log(res)
          if (res.data.status === 1) {
            _this.triggerText = `兼职类型：${_this.normalizeJobType(parseInt(_this.jobType))} 基本工资：${_this.reward}元/${_this.normalizeRewardType(parseInt(_this.rewardType))}`
            // console.log(_this.triggerText)
            _this.$refs.trigger2.innerHTML = _this.triggerText
            _this.$layer.closeAll()
            _this.$layer.msg(res.data.msg)
            _this.sendPreferRequest()
          }
        })
    },
    sendPreferRequest () {
      let _this = this
      axios.post('http://equator8848.xyz:8080/yian2/preference/getAttentionedType.do')
        .then(res => {
          // console.log(res)
          if (res.data.status === 1) {
            if (res.data.data.isMark.length === 0) {
              _this.$layer.closeAll()
              _this.$layer.msg('抱歉，暂无满足该条件的兼职')
              _this.listTitle = '相似推荐'
              _this.preferList = res.data.data.isNotMark
            } else {
              _this.listTitle = '我的偏好'
              _this.preferList = res.data.data.isMark
            }
          }
          // console.log(_this.preferList)
        })
    },
    changeSwitch (checked) {
      console.log(checked)
      let switchStatus = 0
      if (checked) {
        switchStatus = 1
      } else {
        switchStatus = 0
      }
      this.axios.post('http://equator8848.xyz:8080/yian2/preference/switchSatus.do', qs.stringify({
        switchStatus: switchStatus
      }))
        .then((res) => {
          console.log(res)
        })
    },
    getPreferType () {
      this.axios.post('http://equator8848.xyz:8080/yian2/preference/getPreferenceJobType.do')
        .then((res) => {
          // console.log(res)
          if (res.data.status === 1) {
            const data = res.data.data
            if (data.switch_status === 1) {
              this.value = true
            } else {
              this.value = false
            }
            this.triggerText = `兼职类型：${this.normalizeJobType(data.jobType)} 基本工资：${data.reward}元/${this.normalizeRewardType(data.rewardType)}`
            // console.log(this.triggerText)
          }
        })
    }
  },
  mounted () {
    this.getPreferType()
    let _this = this
    var mobileSelect2 = new MobileSelect({// eslint-disable-line
      trigger: '#trigger2',
      title: '选择偏好',
      wheels: [
        {data: this.chooseList}
      ],
      position: [0, 0, 0],
      transitionEnd: function (indexArr, data) {
        // console.log(data)
      },
      callback: function (indexArr, data) {
        // console.log(data) // 选择的轮子的数据
        _this.jobType = data[0].id
        _this.rewardType = data[1].id
        _this.reward = data[2].value
        if (_this.jobType && _this.rewardType && _this.reward) {
          _this.sendChangeRequest()
        }
      }
    })
    this.sendPreferRequest()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
@import '~@/assets/styles/varibles.styl'
  ul
    margin 0 .12rem
    border-radius .2rem
    overflow hidden
  .isPush
    position relative
    margin 1.06rem .12rem 0
    background-color #ffffff
    height .8rem
    line-height .8rem
    border-radius .1rem
    span
      position absolute
      left .2rem
    .prefer-switch
      position absolute
      top .2rem
      right .2rem
  li
    background-color #ffffff
  #trigger2
    position relative
    background-color #ffffff
    height .8rem
    line-height .8rem
    text-align center
    margin 0.2rem .12rem
    color $bgColor
    border-radius .1rem
    font-size .24rem
    span
      position absolute
      right .3rem
      color #acacac
      font-size .3rem
  .block-title
    background-color #E3E3E3
    font-size .28rem
    height .7rem
    line-height .7rem
    margin-bottom .2rem
    padding 0 .2rem
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
</style>
