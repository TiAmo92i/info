import requests from './axios'
import mockRequests from './mockAjax'

export const reqGetInfo = (data) => {
  return requests({ url: '/list-server/list', method: 'get', params: { data } })
}

export const reqGetBlog = (data) => {
  return requests({ url: '/list-server/blog', method: 'get', params: { data } })
}

export const reqSendComment = (token, input, seq) => {
  return requests({ url: '/list-server/addComment', method: 'get', params: { token, input, seq } })
}

export const reqGetComment = (seq) => {
  return requests({ url: 'list-server/getComment', method: 'get', params: { seq } })
}

export const reqLogin = (userName, password) => {
  return requests({ url: 'list-server/Login', method: 'post', data: { userName, password } })
}

export const reqRegister = (userName, password) => {
  return requests({ url: 'list-server/Register', method: 'post', data: { userName, password } })
}
