import { AxiosRequestConfig } from 'axios'
import { UserPageDto } from '@dto'
import { service } from '@utils/service'

export class PageService {
  static get<T>(path: string, options?: AxiosRequestConfig): Promise<T> {
    return service.get(`/pages${path}`, options)
  }

  static getUser(path: string, options?: AxiosRequestConfig): Promise<UserPageDto> {
    return service.get(`/pages/users${path}`, { ...options, validateStatus: () => true })
  }
}
