import Axios from 'lib/axios'
import { DayDto } from 'dto'

export default class DayService {
  static getById(id: number): Promise<DayDto> {
    return Axios.get(`/days/${id}`)
  }

  static incrementViews(data: { id: number }): Promise<void> {
    const { id } = data

    return Axios.patch(`/days/${id}/views`)
  }
}
