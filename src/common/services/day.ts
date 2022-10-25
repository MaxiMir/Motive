import Axios from 'src/common/lib/axios'
import { DayDto } from 'src/common/dto'

export class DayService {
  static getById(id: number): Promise<DayDto> {
    return Axios.get(`/days/${id}`)
  }

  static incrementViews(id: number): Promise<void> {
    return Axios.patch(`/days/${id}/views`)
  }
}
