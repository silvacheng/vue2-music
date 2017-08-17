/*
* @Author: chenghongliang
* @Date:   2017-08-08 00:01:19
* @Last Modified by:   chenghongliang
* @Last Modified time: 2017-08-08 00:04:34
*/

export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options = {
  param: 'jsonpCallback'
}

export const ERR_OK = 0

// 拼装ajax请求数据
export function parseParam(obj) {
  if (!(obj instanceof Object)) {
    return false
  }
  let ObjStr = ''
  for (let k in obj) {
    ObjStr += k + '=' + obj[k] + '&'
  }
  return ObjStr.substr(0, ObjStr.length - 1)
}
