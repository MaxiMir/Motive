import { AxiosRequestConfig } from 'axios'
import fetcher from '@shared/api/fetcher'
import { RatingPageDto } from '@entities/rating/model/dto'

export const getRatingPage = (options?: AxiosRequestConfig): Promise<RatingPageDto> =>
  fetcher.get('/pages/rating', options)
