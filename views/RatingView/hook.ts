import useSWR, { SWRResponse } from 'swr'
import { RatingPageDto } from 'dto'
import PageService from 'services/PageService'

export default function useRatingPage(fallbackData: RatingPageDto): SWRResponse<RatingPageDto> {
  return useSWR('Rating', PageService.getRating, { fallbackData })
}
