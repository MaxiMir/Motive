import { DayDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'

export const getDay = (id: number): Promise<DayDto> => {
  return fetcher.get(`/days/${id}`)
}
