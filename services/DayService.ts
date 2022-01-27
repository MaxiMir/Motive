import Axios from 'lib/axios'
import { DayDto } from 'dto'

export default class DayService {
  /**
   * /days/{id}
   */
  static getById(id: number): Promise<DayDto> {
    return Axios.get(`/days/${id}`)
  }

  /**
   * /days/{id}/views
   */
  static incrementViews(data: { id: number }): Promise<void> {
    const { id } = data

    return Axios.patch(`/days/${id}/views`)
  }
}
