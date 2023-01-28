import { fetcher } from '../fetcher'
import { DayDto } from './model'

export const getDay = (id: number): Promise<DayDto> => {
  return fetcher.get(`/days/${id}`)
}

export const incrementDayViews = (id: number): Promise<void> => {
  return fetcher.patch(`/days/${id}/views`)
}
