import { fetcher } from '../fetcher'
import { DayDto } from './dto'

export function getDay(id: number): Promise<DayDto> {
  return fetcher.get(`/days/${id}`)
}

export function incrementDayViews(id: number): Promise<void> {
  return fetcher.patch(`/days/${id}/views`)
}
