<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box></search-box>
    </div>
    <div class="hot-key">
      <h1 class="title">热门搜索</h1>
      <ul>
        <li class="item" v-for="item in hotKey">
          <span>{{item.k}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import SearchBox from 'base/search-box/search-box'
  // import SearchList from 'base/search-box/search-list'
  import Loading from 'base/loading/loading'
  import {getHotKey} from 'api/search'
  import {ERR_OK} from 'api/config'
  export default {
    data() {
      return {
        hotKey: []
      }
    },
    created() {
      this._getHotKey()
    },
    methods: {
      _getHotKey() {
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotKey = res.data.hotkey.slice(0, 10)
          }
        })
      }
    },
    components: {
      SearchBox,
      Loading
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .hot-key
      margin: 0 20px 20px 20px
      .title
        margin-bottom: 20px
        font-size: $font-size-medium
        color: $color-text-l
      .item
        display: inline-block
        padding: 5px 10px
        margin: 0 20px 10px 0
        border-radius: 6px
        background: $color-highlight-background
        font-size: $font-size-medium
        color: $color-text-d
</style>
