import {getLyric} from '../../api/song'
import {ERR_OK} from '../../api/config'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          // console.log(this.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}
// 抽象出来工厂方法
export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    url: 'http://dl.stream.qqmusic.qq.com/C400001Qu4I30eVFYb.m4a?vkey=FBDF98E0BF3C49FB7EC2858943086ED24D07801A73F442EC1D835A69BC3B76998AF8165E3CC576F47D72E526CD291DE2A3A428B406299E96&guid=1622353232&uin=3086241195&fromtag=66'
    // url: `http://dl.stream.qqmusic.qq.com/C400001Qu4I30eVFYb.m4a?vkey=6017C28617AA45DCD258057216E0D37E7E2A86F17A1601190E213598E39BAA38AA64E6EE5418D1197326DE95D2A706CFC29A81B49E4B3097&guid=1622353232&uin=3086241195&fromtag=66`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
