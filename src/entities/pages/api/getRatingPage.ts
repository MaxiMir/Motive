import { AxiosRequestConfig } from 'axios'
import { RatingPageDto } from '@shared/api/pages'
import { fetcher } from '@shared/config'

export const getRatingPage = (options?: AxiosRequestConfig): Promise<RatingPageDto> =>
  fetcher.get('/pages/rating', options)
