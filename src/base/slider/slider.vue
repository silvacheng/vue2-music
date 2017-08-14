<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'

  export default {
    name: 'slider',
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      // 监听屏幕视口发生变化事件
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        // 屏幕宽度发生变化 刷新slider
        this.slider.refresh()
      })
    },
    methods: {
      // 优化屏幕视口发生变化 如果发生 则不多加2个item
      _setSliderWidth(isResize) {
        // 轮播图片的个数
        this.children = this.$refs.sliderGroup.children
        // console.log(this.children.length)
        // 轮播图总宽度
        let width = 0
        // 每张图的宽度
        let silderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = silderWidth + 'px'
          width += silderWidth
        }

        if (this.loop && !isResize) {
          // 循环播放需要左右加一张图的宽度
          width += 2 * silderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3, // 用手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
          snapSpeed: 400
        })
        // slider 滚动结束时触发
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            // 如果为循环 需要将pageIndex -1 （1,2,3,4,5） --> (0,1,2,3,4,5)
            pageIndex -= 1
          }
          // console.log('当前页面索引为：' + pageIndex)
          this.currentPageIndex = pageIndex
          // 滚动结束后 调用一次_play()
          if (this.autoPlay) {
            this._play()
          }
        })
        // slider 滚动开始之前触发
        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _play() {
        // 循环播放  仅需要改变pageIndex
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400) // 滚动到对应的页面需要400ms
        }, this.interval)
      }
    },
    activated() {
      // 组件激活时调用
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      // 组件停用时调用
      clearTimeout(this.timer)
    },
    destroyed() {
      // 组件销毁的时候 清除定时器
      clearTimeout(this.timer)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .slider
    min-height: 1px
    position: relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: #f90

</style>
