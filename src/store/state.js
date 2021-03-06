import {playMode} from 'common/js/config'
import {loadSearch, loadPlay} from 'common/js/cache'
// 状态   vuex中的数据除了写死  也能从本地读取一些数据
const state = {
  singer: {}, // 歌手
  topList: {}, // 排行歌曲
  playing: false, // 播放器状态  播放、停止
  fullScreen: false, // 播放器  全屏
  playList: [], // 播放列表
  sequenceList: [], // 播放顺序列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放歌曲索引
  searchHistory: loadSearch(), // 从本地缓存读取searchHistory
  playHistory: loadPlay(), // 本地读取的播放历史
  disc: {},
  favoriteList: []
}

export default state
