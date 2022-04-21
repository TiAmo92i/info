// import axios from 'axios'

// axios.defaults.baseURL = 'http://127.0.0.1:8000'
// const requests = axios
//   .get('/list-server', {
//     timeout: 5000,
//   })
//   .then((value) => {
//     return value.data
//   })
// export default requests

// 对于axios进行二次封装
import axios from 'axios'

// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// start：进度条开始  done：进度条结束

// 1. 利用axios对象的方法create，去创建一个axios实例
// 2. request就是axios，可以稍微配置一下
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求的时候，路径当中会出现api
  // 代表请求超时的时间 5s
  timeout: 5000,
})

// 请求拦截器：再发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  // config:配置对象，对象里面有一个属性很重要，header请求头
  // 进度条开始动
  nprogress.start()
  return config
})

// 响应拦截器：
requests.interceptors.response.use(
  (res) => {
    // 进度条结束
    nprogress.done()
    return res.data
  },
  (err) => {
    return Promise.reject(new err('faile'))
  }
)

export default requests
