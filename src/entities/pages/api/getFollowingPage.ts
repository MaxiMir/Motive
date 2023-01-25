import { AxiosRequestConfig } from 'axios'
import { FollowingPageDto } from '@entities/pages/model/dto'
import fetcher from '@shared/api/fetcher'

export const getFollowingPage = (options?: AxiosRequestConfig): Promise<FollowingPageDto> =>
  fetcher.get('/pages/following', options)
