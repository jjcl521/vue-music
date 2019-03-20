import { Success } from "api/config";
import axios from "axios";

export function getSingerList() {
  //https://u.y.qq.com/cgi-bin/musicu.fcg
  const url = "/api/singer/list";

  let params = {
    "-=": "getUCGI915569661938376",
    g_tk: 414341438,
    loginUin: 88051669,
    hostUin: 0,
    format: "json",
    inCharset: "utf8",
    outCharset: "utf-8",
    notice: 0,
    platform: "yqq.json",
    needNewCode: 0,
    data: {
      comm: {
        ct: 24,
        cv: 0
      },
      singerList: {
        module: "Music.SingerListServer",
        method: "get_singer_list",
        param: {
          area: -100,
          sex: -100,
          genre: -100,
          index: -100,
          sin: 200,
          cur_page: 2
        }
      }
    }
  };
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(r => {
        if (r.data.code === Success) resolve(r.data.singerList);
        else reject(r.data.msg);
      });
  });
}

export function getSinger(singermid) {
  const url = "/api/singer/get";

  let params = {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    ct: 24,
    order: 'listen',
    begin: 0,
    num: 50,
    songstatus: 1,
  };
  params.singermid = singermid;
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(r => {
      if (r.data.code === Success) resolve(r.data.data.list);
      else reject(r.data.msg);     
    });
  });
}