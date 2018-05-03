
// 获取状态
export const singer = state => state.singer
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
