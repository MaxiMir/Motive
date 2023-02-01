import { AxiosRequestConfig } from 'axios'
import { fetcher } from '../fetcher'
import { FollowingPageDto, RatingPageDto, SearchPageDto, UserPageDto } from './model'

export const getFollowingPage = (options?: AxiosRequestConfig): Promise<FollowingPageDto> => {
  return fetcher.get('/pages/following', options)
}

export const getRatingPage = (options?: AxiosRequestConfig): Promise<RatingPageDto> => {
  return fetcher.get('/pages/rating', options)
}

export const getSearchPage = (options?: AxiosRequestConfig): Promise<SearchPageDto> => {
  return fetcher.get('/pages/search', options)
}

export const getUserPage = (
  nickname: string,
  options?: AxiosRequestConfig,
): Promise<UserPageDto> => {
  return fetcher.get(`/pages/users/${nickname}`, { ...options, validateStatus: () => true })
}
