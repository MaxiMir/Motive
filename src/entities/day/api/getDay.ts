import fetcher from '@shared/api/fetcher'
import { DayDto } from '@app//model/day'

export const getDay = (id: number): Promise<DayDto> => {
  return fetcher.get(`/days/${id}`)
}
