<template>
  <transition name="drop">
    <div class="top-tip" @click.stop="hide" v-show="showFlag">
      <slot></slot>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      delay: {
        type: Number,
        default: 2000
      }
    },
    data() {
      return {
        showFlag: false
      } 
    },
    methods: {
      show() {
        this.showFlag = true
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.hide()
        }, this.delay)
      },
      hide() {
        this.showFlag = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .top-tip
    position fixed
    top 0
    width 100%
    z-index 500
    background: $color-dialog-background
    &.drop-enter-active, &.drop-leave-active
      transition all 0.3s
    &.drop-enter, &.drop-leave-to
      transform translate3d(0, -100%, 0)      
</style>
