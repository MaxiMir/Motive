import { AxiosRequestConfig } from 'axios'
import Axios from 'lib/axios'
import { UserPageDto } from 'dto'

export default class PageService {
  static get<T>(urn: string, options?: AxiosRequestConfig): Promise<T> {
    return Axios.get(`/pages${urn}`, options)
  }

  static getUser(urn: string, options?: AxiosRequestConfig): Promise<UserPageDto> {
    return Axios.get(`/pages/users${urn}`, { ...options, validateStatus: () => true })
  }
}
