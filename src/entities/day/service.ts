import fetcher from '@shared/api/fetcher'
import { DayDto } from './model/dto'

export class DayService {
  static getById(id: number): Promise<DayDto> {
    return fetcher.get(`/days/${id}`)
  }

  static incrementViews(id: number): Promise<void> {
    return fetcher.patch(`/days/${id}/views`)
  }
}
