import { AxiosRequestConfig } from 'axios'
import fetcher from '@shared/config/fetcher'
import { SearchPageDto } from '@shared/api/pages'

export const getSearchPage = (options?: AxiosRequestConfig): Promise<SearchPageDto> =>
  fetcher.get('/pages/search', options)
