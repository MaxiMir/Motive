import axios from 'axios'

const service = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/v1`,
  withCredentials: true,
})

service.defaults.headers.common['Content-Type'] = 'application/json'
service.interceptors.response.use(
  (r) => r.data,
  (e) => {
    throw e
  },
)

export { service }
