import { AxiosRequestConfig } from 'axios'
import fetcher from '@shared/config/fetcher'
import { RatingPageDto } from '@shared/api/pages'

export const getRatingPage = (options?: AxiosRequestConfig): Promise<RatingPageDto> =>
  fetcher.get('/pages/rating', options)
