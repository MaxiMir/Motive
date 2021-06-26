import Axios from 'axios'

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api'
// Axios.interceptors.response.use((response) => response.data) // TODO
Axios.defaults.headers = {
  'Content-Type': 'application/json',
}

export default Axios
