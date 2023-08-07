import { AxiosRequestConfig } from 'axios'
import { fetcher } from '../fetcher'
import {
  ArticlePageDto,
  BlogPageDto,
  FollowingPageDto,
  RatingPageDto,
  SearchPageDto,
  UserPageDto,
} from './dto'

export function getFollowingPage(options?: AxiosRequestConfig): Promise<FollowingPageDto> {
  return fetcher.get('/pages/following', options)
}

export function getRatingPage(options?: AxiosRequestConfig): Promise<RatingPageDto> {
  return fetcher.get('/pages/rating', options)
}

export function getSearchPage(options?: AxiosRequestConfig): Promise<SearchPageDto> {
  return fetcher.get('/pages/search', options)
}

export function getUserPage(nickname: string, options?: AxiosRequestConfig): Promise<UserPageDto> {
  return fetcher.get(`/pages/users/${nickname}`, { ...options, validateStatus: () => true })
}

export function getBlogPage(options?: AxiosRequestConfig): Promise<BlogPageDto> {
  return fetcher.get('/pages/blog', options)
}

export function getArticlePage(
  pathname: string,
  options?: AxiosRequestConfig,
): Promise<ArticlePageDto> {
  return fetcher.get(`/pages/blog/${pathname}`, { ...options, validateStatus: () => true })
}
