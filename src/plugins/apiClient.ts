import axios from 'axios'
import Qs from 'qs'

const config = {
  baseURL: '/api',
  timeout: 30000,
  withCredentials: true,
  paramsSerializer: function (params: any) {
    return Qs.stringify(params, { indices: false })
  },
}
const apiClient = axios.create({
  ...config,
})

export default apiClient
