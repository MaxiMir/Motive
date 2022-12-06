import { AxiosRequestConfig } from 'axios'
import { RatingPageDto, SearchPageDto, FollowingPageDto, UserPageDto } from '@dto'
import fetcher from '@lib/fetcher'

export class PageService {
  static getSearch(options?: AxiosRequestConfig): Promise<SearchPageDto> {
    return fetcher.get('/pages/search', options)
  }

  static getRating(options?: AxiosRequestConfig): Promise<RatingPageDto> {
    return fetcher.get('/pages/rating', options)
  }

  static getFollowing(options?: AxiosRequestConfig): Promise<FollowingPageDto> {
    return fetcher.get('/pages/following', options)
  }

  static getUser(nickname: string, options?: AxiosRequestConfig): Promise<UserPageDto> {
    return fetcher.get(`/pages/users/${nickname}`, { ...options, validateStatus: () => true })
  }
}
