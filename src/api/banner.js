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
  return request({
    url: '/admin/v1/banner/del',
    method: 'post',
    newType: true,
    data: { data: JSON.stringify({ 'id': id }) }
  })
}
// 创建banner  编辑banner(附带id为编辑)
export function submitBanner(data) {
  const url = (data.id) ? '/admin/v1/banner/edit' : '/admin/v1/banner/add'
  return request({
    url: url,
    method: 'post',
    newType: true,
    data: { data: JSON.stringify(data) }
  })
}
// 根据 id 获取 单条 banner 信息
export function getBanner(id) {
  return request({
    url: '/admin/v1/banner/getbanner',
    method: 'post',
    newType: true,
    data: { data: JSON.stringify({ 'id': id }) }
  })
}
