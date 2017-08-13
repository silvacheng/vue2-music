/*
* @Author: Administrator
* @Date:   2017-08-09 10:31:17
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-09 10:31:19
*/

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import cerateLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [cerateLogger()] : []
})
