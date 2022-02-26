import Axios from 'lib/axios'
import { SubscriptionPageDto, RatingPageDto, UserPageDto } from 'dto'

export default class PageService {
  static async getRating(): Promise<RatingPageDto> {
    return Axios.get('/pages/rating')
  }

  static async getFollowing(): Promise<SubscriptionPageDto> {
    return Axios.get('/pages/following')
  }

  static getUser(urn: string): Promise<UserPageDto> {
    return Axios.get(`/pages/users${urn}`, { validateStatus: () => true })
  }
}
