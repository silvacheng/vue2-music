/**
 * Created by Administrator on 2017/8/12 0012.
 */
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config.js'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    g_tk: 1664029744
  })
  return jsonp(url, data, options)
}
