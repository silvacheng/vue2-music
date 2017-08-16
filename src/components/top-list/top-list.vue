<template>
  <transition name="slide">
    <music-list></music-list>
  </transition>
</template>
<script type="text/ECMAScript-6">
  import MusicList from 'components/music-list/music-list'
  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {},
      bgImage() {}
    },
    methods: {
      _getMusicList() {
        if (!this.topList.id) {
          return false
        }
      }
    },
    components: {
      MusicList
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition all 0.3s

  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
