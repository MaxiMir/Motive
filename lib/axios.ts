import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/v1`,
  withCredentials: true,
})

instance.defaults.headers.common['Content-Type'] = 'application/json'

instance.interceptors.response.use(
  (r) => r.data,
  (e) => {
    throw e
  },
)

export default instance
