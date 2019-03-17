<template>
  <div class="weui-div" @click.stop="toggle">
    <span class="weui-switch" :class="{'weui-switch-on' : me_checked}" :value="value" ></span>
    <!-- <div v-if='!value' class="weui-div-2">未处理</div>
    <div v-if='value' class="weui-div-1">已处理</div> -->
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    handle: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      me_checked: this.value
    }
  },
  watch: {
    value () {
      this.me_checked = this.value
    }
  },
  methods: {
    toggle () {
      // 是否可点击
      if (this.handle === true) {
        this.me_checked = !this.me_checked
        this.$emit('changeSwitch', this.me_checked)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .weui-div{
    position:relative;
    width: 52px;
    height: 22px;
  }
  // .weui-div-1{
  //   position:absolute;
  //   left:10px;
  //   top:0;
  //   line-height:32px;
  //   font-size:12px;
  //   color:#333333;
  // }
  // .weui-div-2{
  //   position:absolute;
  //   right:11px;
  //   top:0;
  //   line-height:32px;
  //   font-size:12px;
  //   color:#999999;
  // }
  .weui-switch {
    display: block;
    position: relative;
    width: 52px;
    height: 22px;
    border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: 11px;
    box-sizing: border-box;
    background-color: #DFDFDF;
    transition: background-color 0.1s, border 0.1s;
  }
  .weui-switch:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 20px;
    border-radius: 10px;
    background-color: #E6E6E6;
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
  }
  .weui-switch:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
  }
  .weui-switch-on {
    border-color: #38D153
    background-color: #39D254
  }
  .weui-switch-on:before {
    border-color: #38D153
    background-color: #39D254
  }
  .weui-switch-on:after {
    transform: translateX(30px);
  }
</style>
