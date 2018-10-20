import request from '@/utils/request'
// 新闻列表
export function fetchList(data) {
  return request({
    url: '/api/news/admin/list',
    method: 'post',
    data
  })
}
// 创建新闻  编辑新闻(附带id为编辑)
export function submitNews(data) {
  return request({
    url: '/api/news/save',
    method: 'post',
    data
  })
}
// 删除新闻
export function deleteArticle(id) {
  return request({
    url: '/api/news/delete/' + id,
    method: 'get'
  })
}
// 获取新闻列表
export function getArticle(id) {
  return request({
    url: 'api/news/detail/' + id,
    method: 'get'
  })
}
