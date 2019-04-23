import axios from 'axios';
import qs from 'qs';
import { Token } from '../utils/utils'

let http = {
  post: '',
  get: '',
}

http.post = function(api, data) {
  let _data = data;
  Object.assign(_data, {token: Token()})
  let params = qs.stringify(_data)
  return new Promise((resolve, rerject) => {
    axios.post(api, params).then((res) => {
      resolve(res)
    })
  })
}

http.get = function(api, data) {
  let _data = data;
  Object.assign(_data.params, {token: Token()})
  // console.log(_data)
  return new Promise((resolve, reject) => {
    axios.get(api, _data).then((res) => {
      resolve(res)
    })
  })
}

export default http