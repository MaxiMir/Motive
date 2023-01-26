import { AxiosRequestConfig } from 'axios'
import { FollowingPageDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'

export const getFollowingPage = (options?: AxiosRequestConfig): Promise<FollowingPageDto> =>
  fetcher.get('/pages/following', options)
