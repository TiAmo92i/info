import requests from './axios'

const reqGetInfo = () => {
  return requests({ url: '/list-server', method: 'get' })
}
export default reqGetInfo
