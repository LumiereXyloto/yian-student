<template>
  <div id="app">
    <tab v-if="tabType"></tab>
    <router-view/>
  </div>
</template>

<script>
import Tab from '@/components/tab/tab'
export default {
  name: 'App',
  data () {
    return {
      tabType: false
    }
  },
  components: {
    Tab
  },
  watch: {
    $route (e) {
      if (e.name === 'Home') {
        this.tabType = true
      } else if (e.name === 'Message') {
        this.tabType = true
      } else if (e.name === 'Personal') {
        this.tabType = true
      } else {
        this.tabType = false
      }
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

</style>
