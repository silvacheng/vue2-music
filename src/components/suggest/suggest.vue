<template>
  <scroll class="suggest"
          ref="suggest"
  >
  <ul class="suggest-list">
    <li class="suggest-item" v-for="item in result">
      <div class="icon">
        <i :class="getIconClass(item)"></i>
      </div>
      <div class="name">
        <p class="text" v-html=""></p>
      </div>
    </li>
    <loading v-show="hasMore" title=""></loading>
  </ul>
  <div class="no-result-wrapper">
    <no-result title="抱歉，暂无搜索结果"></no-result>
  </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import NoResult from 'base/no-result/no-result'
  const TYPE_SINGER = 'singer'
  // const perpage = 20

  export default {
    props: {
      showSinger: {
        type: Boolean,
        default: true
      },
      query: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        hasMore: true,
        result: [],
        page: 1,
        pullup: true,
        beforeScroll: true
      }
    },
    methods: {
      getIconClass(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}--${item.singer}`
        }
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height 100%
    overflow hidden
    .suggest-list 
      padding 0 30px
      .suggest-item 
        display flex 
        align-items center 
        padding-bottom 20px
        .icon 
          flex 0 0 30px
          width 30px
          [class^="icon-"]
            font-size 14px
            color $color-text-d
        .name 
          flex 1
          font-size $font-size-medium
          color $color-text-d
          overflow hidden
          .text 
            no-wrap()   
    .no-result-wrapper
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)        

</style>
