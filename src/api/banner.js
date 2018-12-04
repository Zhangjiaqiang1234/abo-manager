// 这是管理 banenr 数据的接口
import request from '@/utils/request'
// import axios from 'axios'
/*
 * 获取 banner 列表 最多5条
 */
export function getBannerList(data) {
  // data.access_token = sessionStorage.getItem('x-auth-token')
  // return axios({
  //   url: 'http://' + process.env.BASE_API + '/admin/v1/banner/getbannerlist',
  //   method: 'post',
  //   data
  // })
  return request({
    url: '/admin/v1/banner/getbannerlist',
    method: 'post',
    newType: true,
    data: { data: JSON.stringify(data) }
  })
}
// 删除 banner 推荐位
export function deleteBanner(id) {
  console.log('准备开始删除')
  return request({
    url: '/admin/v1/banner/del',
    method: 'post',
    newType: true,
    data: { data: JSON.stringify({ 'id': id }) }
  })
}
// 添加 banner 推荐位
export function addBanner(data) {
  return request({
    url: '/admin/v1/banner/add',
    method: 'post',
    newType: true,
    data: { data: JSON.stringify(data) }
  })
}
// 根据 id 修改 banner 信息接口
export function editBanner(data) {
  return false
  // return request({
  //   url: '/admin/v1/banner/edit',
  //   method: 'post',
  //   newType: true,
  //   data: { data: JSON.stringify(data) }
  // })
}
// 根据 id 获取 单条 banner 信息
export function getBanner(id) {
  return false
  // return request({
  //   url: 'api/news/detail/' + id,
  //   method: 'get'
  // })
}
