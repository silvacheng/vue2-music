import {playMode} from 'common/js/config'
import {loadSearch} from 'common/js/cache'
// 状态
const state = {
  singer: {}, // 歌手
  topList: {}, // 排行歌曲
  playing: false, // 播放器状态  播放、停止
  fullScreen: false, // 播放器  全屏
  playList: [], // 播放列表
  sequenceList: [], // 播放顺序列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放歌曲索引
  searchHistory: loadSearch(),
  disc: {}
}

export default state
