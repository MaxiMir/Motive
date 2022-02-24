import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/v1`,
  withCredentials: true,
})

instance.defaults.headers = {
  'Content-Type': 'application/json',
}

instance.interceptors.response.use(
  (r) => r.data,
  (e) => {
    throw e
  },
)

export default instance
