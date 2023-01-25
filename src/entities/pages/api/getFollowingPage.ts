import { AxiosRequestConfig } from 'axios'
import { FollowingPageDto } from '@shared/api/pages'
import fetcher from '@shared/config/fetcher'

export const getFollowingPage = (options?: AxiosRequestConfig): Promise<FollowingPageDto> =>
  fetcher.get('/pages/following', options)
