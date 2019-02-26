<template>
  <div>
    <personal-header :title="title"></personal-header>
    <div class="wrapper">
      <div class="item">
        <router-link to="/personal-info">
          个人信息
        </router-link>
      </div>
      <div class="item">账号安全与认证</div>
      <div class="item">
        <router-link to="/my-parttimejob">
          我的兼职
        </router-link>
      </div>
      <div class="item">我的关注</div>
      <div class="item">我的评价</div>
      <div class="item">联系与反馈</div>
      <div class="item" @click="signOut">注销登录</div>
    </div>
  </div>
</template>

<script>
import PersonalHeader from 'components/header/header'
export default {
  name: 'Personal',
  components: {
    PersonalHeader
  },
  data () {
    return {
      title: '我'
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
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
  .wrapper
    display flex
    flex-direction column
    justify-content center
    text-align center
    margin-top 3rem
    .item
      padding .3rem 0
      margin-top .2rem
      background #eeeeee
</style>
