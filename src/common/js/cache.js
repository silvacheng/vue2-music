import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

// const PLAY_KEY = '__play__'
// const PLAY_MAX_LEN = 200

// const FAVORITE_KEY = '__favorite__'
// const FAVORITE_MAX_LEN = 200

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

function insertArray(arr, val, compare, maxlen) {
  // compare是一个FUNC用来查找
  // 查找需要插入的数据在数组中的索引值
  const index = arr.findIndex(compare)
  // 索引值为数组的第一个  则不用改变数组的顺序
  if (index === 0) {
    return
  }
  // 数组中已经有
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 数组向前插入val
  arr.unshift(val)
  // 插入以后如果数组数量大于maxlen 删除最后一个数据
  if (maxlen && arr.length > maxlen) {
    arr.pop()
  }
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}
