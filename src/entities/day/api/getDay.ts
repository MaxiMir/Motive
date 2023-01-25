import fetcher from '@shared/api/fetcher'
import { DayDto } from '@shared/model/day'

export const getDay = (id: number): Promise<DayDto> => {
  return fetcher.get(`/days/${id}`)
}
