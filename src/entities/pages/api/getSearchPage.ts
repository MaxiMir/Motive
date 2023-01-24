import { AxiosRequestConfig } from 'axios'
import fetcher from '@shared/api/fetcher'
import { SearchPageDto } from '@entities/pages/model/dto'

export const getSearchPage = (options?: AxiosRequestConfig): Promise<SearchPageDto> =>
  fetcher.get('/pages/search', options)
