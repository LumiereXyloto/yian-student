<template>
  <div>
    <my-parttimejob-header :title="title"></my-parttimejob-header>
    <folding-board :title="tabTitle1" :content="content1" :msg="msg1"></folding-board>
    <folding-board :title="tabTitle2" :content="content2" :msg="msg2"></folding-board>
    <folding-board :title="tabTitle3" :content="content3" :msg="msg3"></folding-board>
  </div>
</template>

<script>
import qs from 'qs'
import MyParttimejobHeader from 'components/header/header'
import FoldingBoard from 'components/folding-board/folding-board'
export default {
  name: 'MyParttimejob',
  components: {
    MyParttimejobHeader,
    FoldingBoard
  },
  data () {
    return {
      title: '我的兼职',
      tabTitle1: '已报名',
      tabTitle2: '待评价',
      tabTitle3: '已完成',
      content1: [],
      content2: [],
      content3: [],
      msg1: '',
      msg2: '',
      msg3: ''
    }
  },
  methods: {
    getSignedJob () {
      this.axios.post('http://equator8848.xyz:8080/yian2/studentSignedJobInfo/getSignedJob.do', qs.stringify({
        status: 1
      }))
        .then((res) => {
          if (res.data.status === 1) {
            this.content1 = res.data.data
          } else if (res.data.status === 0) {
            this.msg1 = res.data.msg
          }
        })
    },
    toBeEvaluated () {
      this.axios.post('http://equator8848.xyz:8080/yian2/studentSignedJobInfo/getSignedJob.do', qs.stringify({
        status: 2
      }))
        .then((res) => {
          if (res.data.status === 1) {
            this.content2 = res.data.data
          } else if (res.data.status === 0) {
            this.msg2 = res.data.msg
          }
        })
    },
    getFinishedJob () {
      this.axios.post('http://equator8848.xyz:8080/yian2/studentSignedJobInfo/getSignedJob.do', qs.stringify({
        status: 4
      }))
        .then((res) => {
          if (res.data.status === 1) {
            this.content3 = res.data.data
          } else if (res.data.status === 0) {
            this.msg3 = res.data.msg
          }
        })
    }
  },
  mounted () {
    this.getSignedJob()
    this.toBeEvaluated()
    this.getFinishedJob()
  }
}
</script>

<style lang="stylus" scoped>

</style>
