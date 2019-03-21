<template>
  <div>
    <message-header :title="title" :bgColor="bgColor" :fontColor="fontColor"></message-header>
    <img src="@/assets/images/message.png" class="banner">
    <message-list></message-list>
    <div style="height:0.86rem"></div>
  </div>
</template>

<script>
import MessageHeader from 'components/header/header'
import MessageList from 'components/message-list/message-list'
export default {
  name: 'Message',
  components: {
    MessageHeader,
    MessageList
  },
  data () {
    return {
      title: '我的消息',
      bgColor: '#409Eff',
      fontColor: '#ffffff'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles'
  .banner
    display block
    width 100%
    height 2.82rem
    margin-top 1rem
    margin-bottom .14rem
</style>
