import Axios from 'axios'

Axios.defaults.baseURL = process.env.SERVER_BASE_URL + '/api'
Axios.interceptors.response.use((response) => response.data)
Axios.defaults.headers = {
  'Content-Type': 'application/json',
}

export default Axios
