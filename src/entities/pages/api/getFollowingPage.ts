import { AxiosRequestConfig } from 'axios'
import fetcher from '@shared/api/fetcher'
import { FollowingPageDto } from '@entities/pages/model/dto'

export const getFollowingPage = (options?: AxiosRequestConfig): Promise<FollowingPageDto> =>
  fetcher.get('/pages/following', options)
