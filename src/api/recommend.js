import jsonp from 'common/js/jsonp'
import { defaultParams, options } from './config.js'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, defaultParams, {
    needNewCode: 1,
    uin: 0,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}
