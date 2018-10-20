import request from '@/utils/request'
// 积分提现列表
export function fetchScoreList(data) {
  return request({
    url: '/api/point/extraction/admin/list',
    method: 'post',
    data,
    headers: { 'x-auth-token': sessionStorage.getItem('x-auth-token') }
  })
}
// 提交修改交易ID
export function txIDUpdate(data) {
  return request({
    url: '/api/point/extraction/admin/update ',
    method: 'post',
    data,
    headers: { 'x-auth-token': sessionStorage.getItem('x-auth-token') }
  })
}
