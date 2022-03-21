import Axios from 'lib/axios'
import { DayDto } from 'dto'

export default class DayService {
  static getById(id: number): Promise<DayDto> {
    return Axios.get(`/days/${id}`)
  }

  static incrementViews(id: number): Promise<void> {
    return Axios.patch(`/days/${id}/views`)
  }
}
