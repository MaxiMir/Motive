import Axios from 'lib/axios'
import { Goal, TopicType, Topic } from 'dto'

export default class DayService {
  /**
   * /days/{id}/{characteristic}/
   */
  static updateCharacteristic(data: { dayId: number; name: string; active: boolean }): Promise<Goal> {
    const { dayId, name, ...body } = data

    return Axios.put(`/days/${dayId}/${name}/`, body)
  }

  /**
   * /days/{id}/discussion/
   */
  static createTopic(data: { dayId: number; type: TopicType; message: string }): Promise<Topic> {
    const { dayId, ...body } = data

    return Axios.post(`/days/${dayId}/discussion/`, body)
  }
}
