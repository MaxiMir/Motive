import { AxiosResponse } from 'axios'
import { Discussion, Feedback, Goal } from 'dto'
import Axios from 'lib/axios'

export default class DayService {
  /**
   * /days/{id}/{characteristic}/
   */
  static setCharacteristic(data: { dayId: string; characteristic: string; active: boolean }): Promise<Goal> {
    const { dayId, characteristic, ...restData } = data

    return Axios.put(`/days/${dayId}/${characteristic}/`, restData)
  }

  /**
   * /days/{id}/discussion/
   */
  static getDiscussion(data: { dayId: string }): Promise<AxiosResponse<Discussion>> {
    const { dayId } = data

    return Axios.get(`/days/${dayId}/discussion/`)
  }

  /**
   * /days/{id}/feedback/
   */
  static getFeedback(data: { dayId: string }): Promise<AxiosResponse<Feedback>> {
    const { dayId } = data

    return Axios.get(`/days/${dayId}/feedback/`)
  }
}
