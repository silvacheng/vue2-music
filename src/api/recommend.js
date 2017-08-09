/*
 * @Author: chenghongliang
 * @Date:   2017-08-07 23:56:41
 * @Last Modified by:   chenghongliang
 * @Last Modified time: 2017-08-08 00:28:43
 */
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config.js'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
