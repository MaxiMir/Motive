import Axios from 'lib/axios'
import { FollowingPageDto, GoalDto, MainPageDto, RatingPageDto, UserDto, UserPageDto } from 'dto'

export default class PageService {
  static async getMain(): Promise<MainPageDto> {
    return Axios.get('/pages/main')
  }

  static async getRating(): Promise<RatingPageDto> {
    return Axios.get('/pages/rating')
  }

  static async getFollowing(): Promise<FollowingPageDto> {
    return Axios.get('/pages/following')
  }

  static getUser(urn: string): Promise<UserPageDto> {
    return Axios.get(`/pages/users${urn}`, { validateStatus: () => true })
  }

  static getCompleted(nickname: string): Promise<GoalDto[]> {
    return Axios.get(`/pages/users/${nickname}/completed`, { validateStatus: () => true })
  }

  static getFollowers(nickname: string): Promise<UserDto[]> {
    return Axios.get(`/pages/users/${nickname}/followers`, { validateStatus: () => true })
  }

  static async getURL<T>(url: string): Promise<T> {
    return Axios.get(url)
  }
}
