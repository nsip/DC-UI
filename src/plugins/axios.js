// import something here
import axios from 'axios'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.prototype.$axios = axios.create({
    // baseURL: 'http://192.168.78.15:1323/api/v0.1.0',
    // baseURL: 'http://localhost:1323/api/v0.1.0',
    // withCredentials: true
  })
}
