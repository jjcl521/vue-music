import defaultJsonp from 'jsonp'

export default function jsonp(url, data, options) {
  url += url.indexOf('?') < 0 ? '?' : '&'
  url += getParam(data)

  return new Promise((resolve, reject) => {
    defaultJsonp(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function getParam(data) {
  let param = ''
  for (let [key, value] of Object.entries(data)) {
    let v = value === undefined ? '' : value
    v = encodeURIComponent(v)
    param += `&${key}=${v}`
  }
  return param ? param.substring(1) : ''
}
