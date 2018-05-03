<template>
  <div class="singer" ref="singer">
    <Listview :data="singers" @select="selectSinger" ref="list"></Listview>
    <router-view></router-view>
  </div>
</template>

<script  type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer' // class方法
  import Listview from 'base/listview/listview'
  import {playlistMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'

  const HOT_NAME = '热门'
  const HOT_SINGER_LENGTH = 10

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        singers: []
      }
    },
    created() {
      this.__getSingerList()
    },
    methods: {
      handlePlayList(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      selectSinger(singer) {
        // console.log(singer)
        this.$router.push({ // 路由跳转
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      __getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            // console.log(res.data.list)
            this.singers = this.__normalizeSinger(res.data.list)
          }
        })
      },
      __normalizeSinger(list) { // 规范化歌手数据
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LENGTH) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })
        // console.log(map)
        // 为了得到有序列表，要处理map
        let ret = []
        let hot = []
        for (let key in map) {
          // 根据key去分类
          let val = map[key]
          if (val.title.match(/[a-zA-z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        // 对ret数组进行排序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      Listview
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%

</style>
