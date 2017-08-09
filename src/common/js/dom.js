/*
 * @Author: chenghongliang
 * @Date:   2017-08-08 21:11:58
 * @Last Modified by:   chenghongliang
 * @Last Modified time: 2017-08-08 21:31:40
 */

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

