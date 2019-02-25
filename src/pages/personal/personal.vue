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
      <div class="item">我的兼职</div>
      <div class="item">我的关注</div>
      <div class="item">我的评价</div>
      <div class="item">联系与反馈</div>
      <div class="item">注销登录</div>
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
          console.log('点击确定')
          this.axios.get('http://yian.our16.top:8080/yian/account/logout.do')
            .then(res => {
              console.log(res)
              _this.$layer.closeAll()
              _this.$layer.msg('注销成功')
              _this.$router.replace('/login')
            })
        },
        end () {
          console.log('点击取消')
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
