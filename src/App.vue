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
      if (e.name === 'Login') {
        this.tabType = false
      } else if (e.name === 'Register') {
        this.tabType = false
      } else {
        this.tabType = true
      }
    }
  },
  mounted () {
    this.checkTabType()
  },
  methods: {
    checkTabType () {
      if (this.$route.name === 'Login') {
        this.tabType = false
      } else if (this.$route.name === 'Register') {
        this.tabType = false
      } else {
        this.tabType = true
      }
    }
  }
}
</script>

<style>

</style>
