import Axios from 'lib/axios'
import { FeedbackDto } from 'dto'

export default class FeedbackService {
  /**
   * /feedback/{id}
   */
  static getById(data: { id: number }): Promise<FeedbackDto> {
    const { id } = data

    return Axios.get(`/feedback/${id}`)
  }
}
