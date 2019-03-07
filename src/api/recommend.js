import jsonp from 'common/js/jsonp'
import { defaultParams, options, Success } from './config.js'
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, defaultParams, {
    needNewCode: 1,
    uin: 0,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export function getRecommendList() {
  //let url='https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
  var params = Object.assign({}, defaultParams, {
    platform: "h5",
    uin: 0,
    format: "json",
    needNewCode: 1
  });
  let promise = new Promise((resolve, reject) => {
    axios.get('/api/recommend/list', {
      params: params
    }).then(r => {
      if (r.data.code === Success)
        resolve(r.data.data);
      else
        reject(r.message)
    })
  })
  return promise;
}