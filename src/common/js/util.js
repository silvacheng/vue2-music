export function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function shuffle(arr) {
  let _arr = arr.slice() // 复制数组
  for (let i = _arr.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1)) // 取随机数
    let itemAtIndex = _arr[randomIndex] // 取数组中此随机数的值
    _arr[randomIndex] = _arr[i] // 将数组最后一个值赋给随机的索引值
    _arr[i] = itemAtIndex //  将数组最后的值换成次随机数的值
  }
  return _arr
}
