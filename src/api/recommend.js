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
    tpl: 3,
    page: "detail",
    date: "2019_09",
    topid: 5,
    type: "top",
    song_begin: 0,
    song_num: 30,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: "json",
    inCharset: "utf8",
    outCharset: "utf8",
    notice: 0,
    platform: "yqq.json",
    needNewCode: 0,
  });
  let promise = new Promise((resolve, reject) => {
    axios.get('/api/recommend/list', {
      params: params
    }).then(r => {
      if (r.data.code === Success)
        resolve(r.data.songlist);
      else
        reject(r.message)
    })
  })
  return promise;
}