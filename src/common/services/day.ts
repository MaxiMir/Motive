import { service } from '@utils/service'
import { DayDto } from '@dto'

export class DayService {
  static getById(id: number): Promise<DayDto> {
    return service.get(`/days/${id}`)
  }

  static incrementViews(id: number): Promise<void> {
    return service.patch(`/days/${id}/views`)
  }
}
