<template>
  <div>
    <message-header :title="title"></message-header>
    <img src="/static/images/banner.png" class="banner">
    <message-list></message-list>
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
      title: '我的消息'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles'
  .banner
    display block
    width 100%
    margin-top $headerHeight
</style>
