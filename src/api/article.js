import request from '@/utils/request'
// 新闻列表
export function fetchList(data) {
  // return request({
  //   url: '/api/news/admin/list',
  //   method: 'post',
  //   data
  // })
  return request({
    url: '/admin/v1/article/getArticleList',
    method: 'post',
    newType: true,
    data: { data: JSON.stringify(data) }
  })
}
// 创建新闻  编辑新闻(附带id为编辑)
export function submitNews(data) {
  // return request({
  //   url: '/api/news/save',
  //   method: 'post',
  //   data
  // })
  const url = (data.id) ? '/admin/v1/article/edit' : '/admin/v1/article/add'
  console.log('即将进行新增 -' + data.id + '- data = ')
  console.log(JSON.stringify(data))
  return request({
    url: url,
    method: 'post',
    newType: true,
    data: { data: JSON.stringify(data) }
  })
}
// 删除新闻
export function deleteArticle(id) {
  // return request({
  //   url: '/api/news/delete/' + id,
  //   method: 'get'
  // })
  return request({
    url: '/admin/v1/article/del',
    method: 'post',
    newType: true,
    data: { data: JSON.stringify({ 'id': id }) }
  })
}
// 根据 id 获取 单条新闻信息
export function getArticle(id) {
  // return request({
  //   url: '/admin/v1/article/getArticle' + id,
  //   method: 'get'
  // })
  return request({
    url: '/admin/v1/goods/getArticle',
    method: 'post',
    newType: true,
    data: { data: JSON.stringify({ 'id': id }) }
  })
}
