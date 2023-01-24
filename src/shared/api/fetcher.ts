import axios from 'axios'

const fetcher = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/v1`,
  withCredentials: true,
})

fetcher.defaults.headers.common['Content-Type'] = 'application/json'
fetcher.interceptors.response.use(
  (r) => r.data,
  (e) => {
    throw e
  },
)

export default fetcher
