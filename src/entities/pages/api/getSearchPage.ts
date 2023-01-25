import { AxiosRequestConfig } from 'axios'
import { SearchPageDto } from '@shared/api/pages'
import fetcher from '@shared/config/fetcher'

export const getSearchPage = (options?: AxiosRequestConfig): Promise<SearchPageDto> =>
  fetcher.get('/pages/search', options)
