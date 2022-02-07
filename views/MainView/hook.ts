import { useQuery, UseQueryResult } from 'react-query'
import { MainPageDto } from 'dto'
import PageService from 'services/PageService'

export const QUERY_KEY = 'main'

export const useHomePage = (): UseQueryResult<MainPageDto> => useQuery(QUERY_KEY, PageService.getMain)
