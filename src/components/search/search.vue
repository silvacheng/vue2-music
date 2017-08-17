<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box></search-box>
    </div>
  </div>
</template>

<script>
  import SearchBox from 'base/search-box/search-box'
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


</style>
