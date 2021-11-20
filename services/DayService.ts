import Axios from 'lib/axios'
import { Discussion, Goal, TopicType, TopicWithQuestion } from 'dto'

export default class DayService {
  /**
   * /days/{id}/{characteristic}/
   */
  static updateCharacteristic(data: { dayId: string; characteristic: string; active: boolean }): Promise<Goal> {
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
  static createTopic(data: { dayId: string; type: TopicType; message: string }): Promise<TopicWithQuestion> {
    const { dayId, ...body } = data

    return Axios.post(`/days/${dayId}/discussion/`, body)
  }
}
