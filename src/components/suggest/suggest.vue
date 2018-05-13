<template>
  <scroll class="suggest"
          ref="suggest"
          :data="result"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @scrollToEnd="searchMore"
          @beforeScroll="listScroll"
  >
  <ul class="suggest-list">
    <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
      <div class="icon">
        <i :class="getIconClass(item)"></i>
      </div>
      <div class="name">
        <p class="text" v-html="getDisplayName(item)"></p>
      </div>
    </li>
    <loading v-show="hasMore" title=""></loading>
  </ul>
  <div class="no-result-wrapper" v-show="!hasMore && !result.length">
    <no-result title="抱歉，暂无搜索结果"></no-result>
  </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import NoResult from 'base/no-result/no-result'
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import {mapMutations, mapActions} from 'vuex'
  import Singer from 'common/js/singer'

  const TYPE_SINGER = 'singer'
  const perpage = 15

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
      // 让父组件调用  刷新scroll组件  进行兼容mini-player模式
      refresh() {
        this.$refs.suggest.refresh()
      },
      search() {
        this.page = 1
        this.hasMore = true // 搜索有结果后才能去上拉刷新
        this.$refs.suggest.scrollTo(0, 0) // 第一次触发search事件时需要将scroll位置重置
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data)
            // 检测当前加载的列表是否已经全部加载  若加载完成则把标志位置为false
            this._checkMore(res.data)
          }
        })
      },
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.page++
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            // 拼接新获取的数组数据到当前的数组中
            this.result = this.result.concat(this._genResult(res.data))
            // 检测当前加载的列表是否已经全部加载  若加载完成则把标志位置为false
            this._checkMore(res.data)
          }
        })
      },
      listScroll() {
        this.$emit('listScroll')
      },
      selectItem(item) {
        console.log(item)
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          // 操作vuex保存歌手信息  在singerDetail组件里面获取歌手信息
          this.setSinger(singer)
        } else {
          // 在playList以及sequenceList里面添加歌曲
          this.insertSong(item)
        }
        // 派发select事件
        this.$emit('select', item)
      },
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
      },
      _genResult(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          if (item.songid && item.albummid) {
            ret.push(createSong(item))
          }
        })
        return ret
      },
      _checkMore(data) {
        const song = data.song
        console.log(song)
        if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
          // 歌曲总数量少
          this.hasMore = false
        }
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      query(newQuery) {
        this.search(newQuery)
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
