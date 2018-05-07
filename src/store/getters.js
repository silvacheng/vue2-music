
// 获取状态
export const singer = state => state.singer
// 排行榜数据
export const topList = state => state.topList

// 播放器状态
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
export const searchHistory = state => state.searchHistory
export const disc = state => state.disc
