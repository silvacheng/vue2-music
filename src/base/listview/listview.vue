<template>
  <scroll class="listview"
          :data="data"
          ref="listview"
          :listen-scroll="listenScroll"
          :probe-type="probeType"
          @scroll="scroll"
  >
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortCutTouchStart" @touchmove.stop.prevent="onShortCutTouchMove">
      <ul>
        <li class="item"
            v-for="(item, index) in shortcutList"
            :data-index="index"
            :class="{'current': currentIndex===index}"
        >{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed">
      <h1 class="fixed-title" v-show="fixedTitle">{{fixedTitle}}</h1>
    </div>
    <div class="load-container" v-show="!data.length">
      <Loading></Loading>
    </div>
  </scroll>
</template>
<script type="text/ECMAScript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getData} from 'common/js/dom'
  const NAME_HEIGHT = 18
  const TITLE_HEIGHT = 30

  export default {
    created() { // 不在props data computed 里面 定义  是因为不需要监听DOM 的setter和getter 仅仅是让menthods里面的两个方法共享此数据
      this.touch = {}
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: { // 计算属性得到的数据  可以直接拿到dom中进行使用
      shortcutList() { // 得到一个数组  作为快速入口查找歌手
        return this.data.map((item) => {
          return item.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    methods: {
      selectItem(item) { // 派发点击事件  基础组件派发
        this.$emit('select', item)
      },
      onShortCutTouchStart(e) {
        let nameIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        // 开始的位置
        this.touch.y1 = firstTouch.pageY
        // 记录当前的锚点
        this.touch.nameIndex = nameIndex
        // console.log('点击的是：' + nameIndex)
        this._scrollTo(nameIndex)
      },
      onShortCutTouchMove(e) {
        // 结束的位置
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        // Y轴上的偏移
        let delta = (this.touch.y2 - this.touch.y1) / NAME_HEIGHT | 0
        let nameIndex = parseInt(this.touch.nameIndex) + delta
        this._scrollTo(nameIndex)
      },
      scroll(pos) {
        this.scrollY = pos.y // 距离顶端的位置
      },
      _scrollTo(index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }

        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        // console.log(newY) 向下滑动newY的值 均为负值
        // 当滚动到顶部 newY>0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 在中间滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
          // 滚动到底部， 且-newY大于最后一个元素的上限
          this.currentIndex = listHeight.length - 2
        }
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        // console.log('距离下一个标题还有：' + fixedTop + 'px')
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translated3d(0,${fixedTop}px,0)`
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: -1px
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
