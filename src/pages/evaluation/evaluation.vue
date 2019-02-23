<template>
  <div>
    <evaluation-header :title="title"></evaluation-header>
    evaluate
  </div>
</template>

<script>
import EvaluationHeader from 'components/header/header'
export default {
  name: 'Evaluation',
  components: {
    EvaluationHeader
  },
  data () {
    return {
      title: 'Ta的评价'
    }
  }
}
</script>
