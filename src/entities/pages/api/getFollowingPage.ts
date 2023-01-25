import { AxiosRequestConfig } from 'axios'
import fetcher from '@shared/config/fetcher'
import { FollowingPageDto } from '@shared/api/pages'

export const getFollowingPage = (options?: AxiosRequestConfig): Promise<FollowingPageDto> =>
  fetcher.get('/pages/following', options)
