import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
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
      console.log('添加的搜索 ===> ' + query)
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
export const playerMixin = {
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playList',
      'mode'
    ])
  },
  methods: {
    changeMode() { // 修改播放模式 就是修改播放列表
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      // 当前歌单顺序已经改变  所以当前歌曲的index已经发生变化  要重新设置currentIndex
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      // console.log('当前歌曲索引为:' + index)
      this.setCurrentIndex(index)
    },
    ...mapMutations({ // 通过实例函数去改变vuex中的值
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE'
    })
  }
}
