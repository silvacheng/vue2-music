
import {mapActions, mapGetters} from 'vuex'
// 多个组件中需要公用的方法
export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlayList(this.playList)
  },
  activated() {
    this.handlePlayList(this.playList)
  },
  watch: {
    palyList(newVal) {
      this.handlePlayList(newVal)
    }
  },
  methods: {
    handlePlayList(newVal) { // 组件中必须定义 handlePlayList的方法
      throw new Error('component must implement handlePlaylist method')
    }
  }
}
export const searchMixin = {
  data() {
    return {
      query: '',
      refreshDelay: 120
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    onQueryChange(newQuery) {
      this.query = newQuery
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    addQuery(query) {
      console.log('addQuery ===> ' + query)
      this.$refs.searchBox.setQuery(query)
    },
    saveSearch() {
      console.log('要保存的搜索记录 ==> ' + this.query)
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
