<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend.prevent="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from 'common/js/dom'
  const progressBtnWidth = 16
  const transform = prefixStyle('transform')

  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {}
    },
    methods: {
      progressTouchStart(e) {
        this.touch.initiated = true // touch时间初始化标识
        this.touch.startX = e.touches[0].pageX // 开始的pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX // 拖动的偏移量
        // console.log('拖动的偏移量:' + deltaX)
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX)) // 偏移位置
        // console.log('偏移:' + offsetWidth)
        this._offset(offsetWidth)
      },
      progressTouchEnd(e) {
        this.touch.initiated = false
        this._triggerPercent() // 通知外层组件当前歌曲拖动的百分比
      },
      progressClick(e) { // 点击某处 切换播放百分比
        // console.log(e.offsetX)
        const rect = this.$refs.progressBar.getBoundingClientRect()
        console.log(rect)
        console.log(e)
        const offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
        this._triggerPercent() // 通知外层组件当前歌曲拖动的百分比
      },
      _offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
      },
      _triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) { // 发生百分比变化 或者在未拖动的情况下
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth = newPercent * barWidth
          this.$refs.progress.style.width = `${offsetWidth}px`
          this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
