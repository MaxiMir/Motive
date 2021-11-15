import { Discussion, Feedback, Goal, TopicWithQuestion } from 'dto'
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
  static getDiscussion(data: { dayId: string }): Promise<Discussion> {
    const { dayId } = data

    return Axios.get(`/days/${dayId}/discussion/`)
  }

  /**
   * /days/{id}/discussion/
   */
  static addQuestion(data: { dayId: string; message: string }): Promise<TopicWithQuestion> {
    const { dayId, message } = data

    return Axios.post(`/days/${dayId}/discussion/`, { message })
  }

  /**
   * /days/{id}/feedback/
   */
  static getFeedback(data: { dayId: string }): Promise<Feedback> {
    const { dayId } = data

    return Axios.get(`/days/${dayId}/feedback/`)
  }
}
