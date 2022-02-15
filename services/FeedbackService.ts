import Axios from 'lib/axios'
import { FeedbackDto } from 'dto'

export default class FeedbackService {
  static create(data: FormData): Promise<FeedbackDto> {
    return Axios.post('/feedback', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
