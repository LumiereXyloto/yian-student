<template>
  <div id="app">
    <tab v-if="tabType"></tab>
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Tab from '@/components/tab/tab'
export default {
  name: 'App',
  data () {
    return {
      tabType: false,
      transitionName: ''
    }
  },
  components: {
    Tab
  },
  watch: {
    $route (to, from) {
      this.checkTabType()
      let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
      this.$router.isBack = false
    }
  },
  mounted () {
    this.checkTabType()
  },
  methods: {
    checkTabType () {
      if (this.$route.name === 'Home') {
        this.tabType = true
      } else if (this.$route.name === 'Message') {
        this.tabType = true
      } else if (this.$route.name === 'Personal') {
        this.tabType = true
      } else {
        this.tabType = false
      }
    }
  }
}
</script>

<style>
  #app{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .child-view {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all .3s ease;
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
</style>
