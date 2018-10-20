import axios from 'axios'
// 图片上传
export const uploadImage = (data) => {
  var url = '/api/common/upload'
  return axios.post(url, data, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

