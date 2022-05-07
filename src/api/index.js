import requests from './axios'

export const reqGetInfo = (data) => {
  return requests({ url: '/list-server/list', method: 'get', params: { data } })
}

export const reqGetBlog = (data) => {
  return requests({ url: '/list-server/blog', method: 'get', params: { data } })
}

export const reqSendComment = (input, seq) => {
  return requests({ url: '/list-server/addComment', method: 'get', params: { input, seq } })
}

export const reqGetComment = (seq) => {
  return requests({ url: 'list-server/getComment', method: 'get', params: { seq } })
}
