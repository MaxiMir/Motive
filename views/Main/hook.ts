import useSWR, { SWRResponse } from 'swr'
import { MainPageDto } from 'dto'
import PageService from 'services/PageService'

export default function useHomePage(fallbackData: MainPageDto): SWRResponse<MainPageDto> {
  return useSWR('home', PageService.getMain, { fallbackData })
}
