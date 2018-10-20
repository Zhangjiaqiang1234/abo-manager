import request from '@/utils/request'
// 意见反馈列表
export function fetchList(id) {
  return request({
    url: '/api/opinion/admin/list?type=' + id,
    method: 'get'
  })
}

