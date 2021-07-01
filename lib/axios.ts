import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api`,
})

instance.defaults.headers = {
  'Content-Type': 'application/json',
}

// instance.interceptors.response.use((response) => response.data) // TODO

// import store from '../store'
//
// const listener = () => {
//   const token = store.getState().token
//   api.defaults.headers.common['Authorization'] = token;
// }
//
// store.subscribe(listener)

export default instance
