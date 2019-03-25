<template>
  <div class="bgWrapper">
    <personal-header :title="title" :bgColor="bgColor" :fontColor="fontColor"></personal-header>
    <div class="logoContainer">
      <div class="logo" :style="bgImg">
      </div>
      <div class="avatar-box">
        <img class="avatar" :src="iconUrl" v-show="iconUrl"/>
      </div>
    </div>
    <div class="wrapper">
      <div class="item border-bottom">
        <router-link to="/personal-info">
          <div>
            个人信息
            <img class="mini-image" src="@/assets/images/1.png">
          </div>
        </router-link>
      </div>
      <div class="item border-bottom">
        <router-link to="/change-password">
          <div>
            密码服务
            <img class="clock-image" src="@/assets/images/clock.png">
          </div>
        </router-link>
      </div>
      <div class="item item-margin-bottom">
        <router-link to="/certification">
          <div>
            账号认证
            <img class="mini-image2" src="@/assets/images/2.png">
          </div>
        </router-link>
      </div>
      <div class="item border-bottom">
        <router-link to="/my-parttimejob">
          <div>
            我的兼职
            <img class="mini-image2" src="@/assets/images/3.png">
          </div>
        </router-link>
      </div>
      <div class="item border-bottom">
        <router-link to="/preference">
          <div>
            我的关注
            <img class="mini-image2" src="@/assets/images/4.png">
          </div>
        </router-link>
      </div>
      <div class="item border-bottom item-margin-bottom">
        <router-link to="/evaluation">
          <div>
            我的评价
            <img class="mini-image2" src="@/assets/images/5.png">
          </div>
        </router-link>
      </div>
      <div class="item">
        <router-link to="/feedback">
          <div>
            评价与反馈
            <img class="mini-image2" src="@/assets/images/6.png">
          </div>
        </router-link>
      </div>
      <div class="item logout" @click="signOut">注 销 登 录</div>
    </div>
    <div style="height:0.86rem"></div>
  </div>
</template>

<script>
import PersonalHeader from 'components/header/header'
import logoImg from '../../../static/images/appLogo.png'
export default {
  name: 'Personal',
  components: {
    PersonalHeader
  },
  data () {
    return {
      title: '个人中心',
      bgColor: '#409Eff',
      fontColor: '#ffffff',
      iconUrl: '',
      bgImg: {
        backgroundImage: 'url(' + logoImg + ')'
      }
    }
  },
  methods: {
    signOut () {
      let _this = this
      this.$layer.closeAll()
      this.$layer.open({
        btn: ['确认', '取消'],
        content: '确认注销？',
        className: 'good luck1',
        shade: true,
        yes (index, $layer) {
          // console.log('点击确定')
          _this.axios.get('http://equator8848.xyz:8080/yian2/common/account/logOut.do')
            .then(res => {
              if (res.data.status === 1) {
                _this.$layer.closeAll()
                _this.$layer.msg(res.data.msg)
                _this.$router.push('/login')
              }
            })
        },
        end () {
          // console.log('点击取消')
          _this.$layer.closeAll()
        }
      })
    },
    getPersonalInfo () {
      this.axios.post('http://equator8848.xyz:8080/yian2/student/getPersonalInfor.do')
        .then((res) => {
          // console.log(res)
          const data = res.data.data
          if (res.data.status === 1) {
            this.iconUrl = data.studentIcon
          }
        })
    }
  },
  mounted () {
    this.getPersonalInfo()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
    a
      color black
  // .bgWrapper
  //   position fixed
  //   z-index -1
  //   width 100%
  //   height 100%
  //   background-color $color-background-grey
    .logoContainer
      display flex
      margin 1.22rem .26rem .36rem
      background-color #ffffff
      padding .8rem .4rem
      border-radius .24rem
      .logo
        flex-grow 7
        background-repeat no-repeat
        background-size 100% 100%
        -moz-background-size 100% 100%
        height 1rem
      .avatar-box
        flex-grow 3
        height 1rem
        // background grey
        position relative
        .avatar
          display block
          position absolute
          left .4rem
          top -0.3rem
          width 1.6rem
          height 1.6rem
          border-radius .9rem
          background-color #FFE1F1
    .wrapper
      display flex
      flex-direction column
      justify-content center
      // text-align center
      // a
      //   color black
      .item
        position relative
        padding .3rem 0 .3rem 1.4rem
        background #ffffff
        .clock-image
          position absolute
          left 0.4rem
          bottom .2rem
          width .52rem
          height .52rem
        .mini-image
          position absolute
          left 0.44rem
          bottom .2rem
          width .44rem
          height .48rem
        .mini-image2
          position absolute
          left 0.44rem
          bottom .22rem
          width .44rem
          height .44rem
      .item-margin-bottom
        margin-bottom .3rem
      .logout
        margin-top .4rem
        padding .3rem 0
        text-align center
        color $color-danger
        font-weight bold
</style>
