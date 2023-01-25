import { DayDto } from '@shared/api/day'
import { fetcher } from '@shared/config'

export const getDay = (id: number): Promise<DayDto> => {
  return fetcher.get(`/days/${id}`)
}
