import axios from 'axios';
import qs from 'qs';
import { Token } from '../utils/utils';


export function http_post(config: EDU.PostConfigType): Promise<any> {
  const _data: any = config.data;
  Object.assign(_data, {token: Token()});
  // let params = qs.stringify(_data)
  if (config.format === 'form_data') {
    return new Promise((resolve, rerject) => {
      axios.post(config.api + '?token=' + Token() + '&roletype=1',
      (qs as any).stringify(_data, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} })).then((res) => {
        resolve(res);
      });
    });
  } else {
    return new Promise((resolve, rerject) => {
      axios.post(config.api + '?token=' + Token() + '&roletype=1', _data).then((res) => {
        resolve(res);
      });
    });
  }
}


export function http_get(config: EDU.GetConfigType): Promise<any> {
  let _data: any = null;
  if (config.params) {
    _data = config.params;
    Object.assign(_data.params, {token: Token(), roletype: 1});
  } else {
    _data = {
      token: Token(),
      roletype: 1,
    };
  }
  return new Promise((resolve, reject) => {
    axios.get(config.api, _data).then((res) => {
      // console.table(data)
      resolve(res);
    });
  });
}
