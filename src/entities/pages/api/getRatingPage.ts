import { AxiosRequestConfig } from 'axios'
import { RatingPageDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'

export const getRatingPage = (options?: AxiosRequestConfig): Promise<RatingPageDto> =>
  fetcher.get('/pages/rating', options)
