import fetcher from '@lib/fetcher'
import { DayDto } from './dto'

export class DayService {
  static getById(id: number): Promise<DayDto> {
    return fetcher.get(`/days/${id}`)
  }

  static incrementViews(id: number): Promise<void> {
    return fetcher.patch(`/days/${id}/views`)
  }
}
