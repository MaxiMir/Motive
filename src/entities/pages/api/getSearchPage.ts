import { AxiosRequestConfig } from 'axios'
import { SearchPageDto } from '@entities/pages/model/dto'
import fetcher from '@shared/api/fetcher'

export const getSearchPage = (options?: AxiosRequestConfig): Promise<SearchPageDto> =>
  fetcher.get('/pages/search', options)
