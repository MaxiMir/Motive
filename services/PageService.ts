import { AxiosRequestConfig } from 'axios'
import Axios from 'lib/axios'
import { SubscriptionPageDto, RatingPageDto, UserPageDto } from 'dto'

export default class PageService {
  static async getRating(options?: AxiosRequestConfig): Promise<RatingPageDto> {
    return Axios.get('/pages/rating', options)
  }

  static async getFollowing(options?: AxiosRequestConfig): Promise<SubscriptionPageDto> {
    return Axios.get('/pages/following', options)
  }

  static getUser(urn: string, options?: AxiosRequestConfig): Promise<UserPageDto> {
    return Axios.get(`/pages/users${urn}`, { ...options, validateStatus: () => true })
  }
}
