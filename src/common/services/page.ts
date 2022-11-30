import { AxiosRequestConfig } from 'axios'
import { UserPageDto } from '@dto'
import fetcher from '@utils/fetcher'

export default class PageService {
  static get<T>(path: string, options?: AxiosRequestConfig): Promise<T> {
    return fetcher.get(`/pages${path}`, options)
  }

  static getUser(path: string, options?: AxiosRequestConfig): Promise<UserPageDto> {
    return fetcher.get(`/pages/users${path}`, { ...options, validateStatus: () => true })
  }
}
