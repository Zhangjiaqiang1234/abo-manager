import request from '@/utils/request'
// 基因检测预约列表
export function fetchList(data) {
  return request({
    url: '/api/gene/sequence/admin/appointment/list',
    method: 'post',
    data
  })
}

// 基因检测预约状态
export function changeStatus(data) {
  return request({
    url: '/api/gene/sequence/admin/appointment/update ',
    method: 'post',
    data
  })
}

