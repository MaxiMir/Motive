import { DayDto } from '@dto'
import fetcher from '@utils/fetcher'

export default class DayService {
  static getById(id: number): Promise<DayDto> {
    return fetcher.get(`/days/${id}`)
  }

  static incrementViews(id: number): Promise<void> {
    return fetcher.patch(`/days/${id}/views`)
  }
}
