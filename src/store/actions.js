
// 异步操作 修改 mutation进行封装
import * as types from './mutation-types'
// import {playMode} from "../common/js/config"
// import {shuffle} from "../common/js/util"

export const selectPlay = function({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
