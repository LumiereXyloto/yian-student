<template>
  <div>
    <my-parttimejob-header :title="title"></my-parttimejob-header>
    <div>已报名</div>
    <div>待评价</div>
    <div>已完成</div>
  </div>
</template>

<script>
import qs from 'qs'
import MyParttimejobHeader from 'components/header/header'
export default {
  name: 'MyParttimejob',
  components: {
    MyParttimejobHeader
  },
  data () {
    return {
      title: '我的兼职'
    }
  },
  methods: {
    getSignedJob () {
      this.axios.post('http://equator8848.xyz:8080/yian2/studentSignedJobInfo/getSignedJob.do', qs.stringify({
        status: 1
      }))
      .then((res) => {
        console.log(res)
      })
    },
    toBeEvaluated () {
      this.axios.post('http://equator8848.xyz:8080/yian2/studentSignedJobInfo/getSignedJob.do', qs.stringify({
        status: 2
      }))
      .then((res) => {
        console.log(res)
      })
    },
    getFinishedJob () {
      this.axios.post('http://equator8848.xyz:8080/yian2/studentSignedJobInfo/getSignedJob.do', qs.stringify({
        status: 4
      }))
      .then((res) => {
        console.log(res)
      })
    }
  },
  mounted () {
    this.getSignedJob(),
    this.toBeEvaluated(),
    this.getFinishedJob()
  }
}
</script>

<style lang="stylus" scoped>

</style>
