import Axios from 'src/common/lib/axios'
import { FeedbackDto } from 'src/common/dto'

export class FeedbackService {
  static create(data: FormData): Promise<FeedbackDto> {
    return Axios.post('/feedback', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
