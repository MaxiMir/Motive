import fetcher from '@shared/config/fetcher'
import { DayDto } from '@shared/api/day'

export const getDay = (id: number): Promise<DayDto> => {
  return fetcher.get(`/days/${id}`)
}
