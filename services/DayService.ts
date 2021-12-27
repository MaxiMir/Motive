import Axios from 'lib/axios'
import { TopicType, TopicDto, DayDto } from 'dto'

export default class DayService {
  /**
   * /days/{id}
   */
  static getById(data: { id: number }): Promise<DayDto> {
    const { id } = data

    return Axios.get(`/days/${id}`)
  }

  /**
   * /days/{id}/{characteristic}
   */
  static updateCharacteristic(data: { id: number; name: string; active: boolean }): Promise<void> {
    const { id, name, ...body } = data

    return Axios.put(`/days/${id}/${name}`, body)
  }

  /**
   * /days/{id}/discussion
   */
  static createTopic(data: { id: number; type: TopicType; message: string }): Promise<TopicDto> {
    const { id, ...body } = data

    return Axios.post(`/days/${id}/discussion`, body)
  }

  /**
   * /days/{id}/views
   */
  static incrementViews(data: { id: number }): Promise<void> {
    const { id } = data

    return Axios.patch(`/days/${id}/views`)
  }
}
