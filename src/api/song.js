import {commonParams, options, songOption} from './config'
import jsonp from 'common/js/jsonp'

export function getLyric(mid) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    inCharset: 'utf8'
  })
  return jsonp(url, data, {
    options, songOption
  })
}
