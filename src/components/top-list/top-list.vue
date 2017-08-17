<template>
  <transition name="slide">
    <music-list :title="title" :songs="songs" :bgImage="bgImage" :rank="rank"></music-list>
  </transition>
</template>
<script type="text/ECMAScript-6">
  import MusicList from 'components/music-list/music-list'
  import {getMusicList} from 'api/rank'
  import {mapGetters} from 'vuex'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'

  export default {
    computed: {
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        if (this.songs.length > 0) {
          return this.songs[0].image
        }
        return ''
      },
      ...mapGetters([
        'topList'
      ])
    },
    created() {
      this._getMusicList()
    },
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    methods: {
      _getMusicList() {
        if (!this.topList.id) {
          return false
        }
        getMusicList(this.topList.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let songsArr = []
        list.forEach((item) => {
          const musicData = item.data
          if (musicData.songid && musicData.albummid) {
            songsArr.push(createSong(musicData))
          }
        })
        return songsArr
      }
    },
    components: {
      MusicList
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable.styl'
  .slide-enter-active, .slide-leave-active
    transition all 0.3s

  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
