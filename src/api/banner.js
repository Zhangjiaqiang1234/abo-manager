// 这是管理 banenr 数据的接口
import request from '@/utils/request'
// import axios from 'axios'
/*
 * 获取 banner 列表 最多5条
 */
export function getBannerList(data) {
  data.access_token = sessionStorage.getItem('x-auth-token')
  data.page = 1
  data.limit = 20
  // return axios({
  //   url: 'http://' + process.env.BASE_API + '/admin/v1/banner/getbannerlist',
  //   method: 'post',
  //   data
  // })
  return request({
    url: '/admin/v1/banner/getbannerlist',
    method: 'post',
    newType: true,
    data
  })
}
// 删除 banner 推荐位
export function deleteBanner(id) {
  return request({
    url: '/api/xxx' + id,
    method: 'get'
  })
}
