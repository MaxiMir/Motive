import Axios from 'lib/axios'
import { TopicType, TopicDto, DayDto, FeedbackDto } from 'dto'

export default class DayService {
  /**
   * /days/{id}
   */
  static getById(data: { id: number }): Promise<DayDto> {
    const { id } = data

    return Axios.get(`/days/${id}`)
  }

  /**
   * /days/{id}/feedback
   */
  static createFeedback(data: { id: number; text: string; photos: File[] }): Promise<FeedbackDto> {
    const { id, ...body } = data

    return Axios.post(`/days/${id}/feedback`, body)
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

    return Axios.post(`/days/${id}/views`)
  }
}
