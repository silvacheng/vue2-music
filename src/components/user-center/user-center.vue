<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
      </div>
      <div class="play-btn" ref="playBtn">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="no-result-wrapper">
        <no-result :title="noResultDesc"></no-result>
      </div>
    </div>
  </transition>
</template>
<script type="text/ECMAScript-6">
  import Switches from 'base/switches/switches'
  import NoResult from 'base/no-result/no-result'
  export default {
    computed: {
      noResultDesc() {
        if (this.currentIndex === 0) {
          return '暂无收藏歌曲'
        } else {
          return '你还没听过的歌曲'
        }
      }
    },
    data() {
      return {
        currentIndex: 0,
        switches: [
          {
            name: '我喜欢的'
          },
          {
            name: '最近听的'
          }
        ]
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      switchItem(index) {
        this.currentIndex = index
      }
    },
    components: {
      Switches,
      NoResult
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .user-center
    position fixed
    top 0
    bottom 0
    width 100%
    z-index 100
    background-color $color-background
    &.slide-enter-active, &.slide-leave-active
      transition all 0.3s
    &.slide-enter, &.slide-leave-to
      transform translate3d(100%, 0, 0)
    .back
      position absolute
      left 6px
      z-index 50
      .icon-back
        display block
        padding 10px
        font-size $font-size-large-x
        color $color-theme
    .switches-wrapper
      margin: 10px 0 30px 0
    .play-btn
      box-sizing: border-box
      width: 135px
      padding: 7px 0
      margin: 0 auto
      text-align: center
      border: 1px solid  $color-text-l
      color: $color-text-l
      border-radius: 100px
      font-size: 0
      .icon-play
        display: inline-block
        vertical-align: middle
        margin-right: 6px
        font-size: $font-size-medium-x
      .text
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small

</style>
